import { isPatchedNode } from '../lib/runtime-security.ts'

if (!isPatchedNode(process.versions.node)) {
  throw new Error(`Node.js ${process.versions.node} is below the required security release (22.23.4 / 24.22.1).`)
}
console.log(`Security runtime check: Node.js ${process.versions.node}`)
