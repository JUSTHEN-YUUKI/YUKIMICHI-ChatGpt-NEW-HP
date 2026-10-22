import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  // Let middleware return 503 for trailing-slash and internal data URLs too.
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
}
export default nextConfig
