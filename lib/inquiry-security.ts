// WAF enforces the shared per-IP quota. This bounded process-local quota is
// defense in depth, not a replacement for the distributed Vercel Firewall rule.
const MAX_BODY_BYTES = 32 * 1024
const WINDOW_MS = 60 * 60 * 1000
const attempts = new Map<string, { count: number; expires: number }>()

export class InquiryRequestError extends Error {
  constructor(public status: number, public code: string) { super(code) }
}

export async function readInquiryPayload(request: Request): Promise<Record<string, unknown>> {
  // A canonical path keeps platform rate-limit matching and handler routing aligned.
  if (new URL(request.url).pathname !== '/api/inquiry') throw new InquiryRequestError(404, 'NOT_FOUND')
  const origin = request.headers.get('origin')
  if (!origin || origin !== new URL(request.url).origin || request.headers.get('sec-fetch-site') === 'cross-site') {
    throw new InquiryRequestError(403, 'INVALID_ORIGIN')
  }
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') ?? '')) {
    throw new InquiryRequestError(415, 'UNSUPPORTED_MEDIA_TYPE')
  }
  if (request.headers.get('content-encoding') && request.headers.get('content-encoding') !== 'identity') {
    throw new InquiryRequestError(415, 'UNSUPPORTED_CONTENT_ENCODING')
  }
  const declaredLength = request.headers.get('content-length')
  if (declaredLength && (!/^\d+$/.test(declaredLength) || Number(declaredLength) > MAX_BODY_BYTES)) {
    throw new InquiryRequestError(413, 'BODY_TOO_LARGE')
  }
  const reader = request.body?.getReader()
  if (!reader) throw new InquiryRequestError(400, 'INVALID_JSON')
  const chunks: Uint8Array[] = []
  let length = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      length += value.byteLength
      if (length > MAX_BODY_BYTES) {
        await reader.cancel()
        throw new InquiryRequestError(413, 'BODY_TOO_LARGE')
      }
      chunks.push(value)
    }
  } finally { reader.releaseLock() }
  const body = new Uint8Array(length)
  let offset = 0
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength }
  let payload: unknown
  try { payload = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(body)) }
  catch { throw new InquiryRequestError(400, 'INVALID_JSON') }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new InquiryRequestError(400, 'INVALID_PAYLOAD')
  for (const value of Object.values(payload)) {
    if (typeof value !== 'string' || value.length > 5000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) {
      throw new InquiryRequestError(400, 'INVALID_FIELD')
    }
  }
  return payload as Record<string, unknown>
}

export function allowInquiryAttempt(key: string, now = Date.now()) {
  for (const [entry, state] of attempts) if (state.expires <= now) attempts.delete(entry)
  const state = attempts.get(key)
  if (state) {
    if (state.count >= 10) return false
    state.count += 1
    return true
  }
  // Fail closed rather than evicting live quotas or growing without a bound.
  if (attempts.size >= 2048) return false
  attempts.set(key, { count: 1, expires: now + WINDOW_MS })
  return true
}
