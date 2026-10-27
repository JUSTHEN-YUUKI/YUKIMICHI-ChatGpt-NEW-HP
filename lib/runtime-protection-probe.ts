import { createServer } from 'node:http'

const expected = 'YUKIMICHI benign runtime verification'
// Valid Brotli produced from the fixed string above, never attacker input.
const compressed = Buffer.from('GyQA+I2UqrNjZGdL9VIXTRRUm5nggv0XUlJEFZ1cuLYisjhN3OebLQA=', 'base64')

type Outcome = { matched: boolean; rejected: boolean; failure?: 'timeout' | 'request_failed' }

/** A Preview-only caller must guard this probe before invoking it. */
export async function probeManagedBrotliProtection() {
  let advertisedBrotli = false
  const server = createServer((request, response) => {
    response.setHeader('Cache-Control', 'no-store')
    response.setHeader('Content-Type', 'text/plain')
    if (request.url === '/brotli') {
      advertisedBrotli = /(?:^|[,\s])br(?:[,\s;]|$)/i.test(request.headers['accept-encoding'] || '')
      response.setHeader('Content-Encoding', 'br')
      response.end(compressed)
    } else {
      response.end(expected)
    }
  })
  try {
    // Loopback only. No external host, credentials, user URL, or customer data.
    await new Promise<void>((resolve, reject) => {
      server.once('error', reject)
      server.listen(0, '127.0.0.1', () => resolve())
    })
    const address = server.address()
    if (!address || typeof address === 'string') throw new Error('Local probe unavailable')
    const port = address.port
    async function request(path: '/plain' | '/brotli'): Promise<Outcome> {
      try {
        const response = await fetch(`http://127.0.0.1:${port}${path}`, {
          headers: path === '/brotli' ? { 'Accept-Encoding': 'br' } : {},
          cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(1500),
        })
        return { matched: response.ok && await response.text() === expected, rejected: false }
      } catch (error) {
        const name = error instanceof Error ? error.name : ''
        return { matched: false, rejected: true,
          failure: name === 'TimeoutError' || name === 'AbortError' ? 'timeout' : 'request_failed' }
      }
    }
    const control = await request('/plain')
    const brotli = await request('/brotli')
    return {
      kind: 'fixed-benign-loopback-fetch' as const,
      control, brotli, advertisedBrotli,
      // A rejection alone is inconclusive without a successful plain response.
      responseProtectionObserved: control.matched && brotli.rejected && brotli.failure !== 'timeout',
      scope: 'fetch only; not proof of a patched Node runtime or all CVE mitigations',
    }
  } finally {
    const closed = new Promise<void>(resolve => server.close(() => resolve()))
    server.closeAllConnections()
    await closed
  }
}
