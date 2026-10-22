import { NextRequest, NextResponse } from 'next/server'
import {
  isMaintenanceEnabled,
  maintenanceApiResponse,
  maintenanceHeaders,
  maintenancePageResponse,
  maintenancePageStatus,
} from './lib/maintenance'

export function middleware(request: NextRequest) {
  if (!isMaintenanceEnabled()) return NextResponse.next()

  const path = request.nextUrl.pathname
  // Only robots.txt is exempt. Serve the existing policy directly, without
  // invoking any application handler. No static-file or admin/API exceptions.
  if (path === '/robots.txt' && (request.method === 'GET' || request.method === 'HEAD')) {
    return new Response(
      'User-Agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: https://justhen.co.jp/sitemap.xml\nHost: https://justhen.co.jp\n',
      { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': maintenanceHeaders['Cache-Control'] } },
    )
  }

  // Encoded/unknown paths are blocked too; the API distinction changes only
  // the response format. All methods stop before route handlers or actions.
  if (path === '/api' || path.startsWith('/api/')) return maintenanceApiResponse()

  return maintenancePageResponse(maintenancePageStatus({
    pathname: path,
    method: request.method,
    userAgent: request.headers.get('user-agent') ?? '',
    accept: request.headers.get('accept') ?? '',
  }))
}

export const config = { matcher: '/:path*' }
