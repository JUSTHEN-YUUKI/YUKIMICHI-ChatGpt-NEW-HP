// October 21, 2026 Node.js security releases. Keep the supported deployment
// major explicit; a different major is not assumed safe merely because it is newer.
export function isPatchedNode(version: string) {
  const match = /^(22|24)\.(\d+)\.(\d+)$/.exec(version)
  if (!match) return false
  const [, major, minor, patch] = match.map(Number)
  const floor = major === 22 ? [23, 4] : [22, 1]
  return minor > floor[0] || (minor === floor[0] && patch >= floor[1])
}
