// This repository is linked to more than one Vercel project. Only the owner's
// named target may build this recovery. Vercel ignoreCommand: 0 skips, 1 builds.
const target = 'prj_qSdp3iNVTw2uI7RXlhiCX3hZnwUH'
const build = process.env.VERCEL_PROJECT_ID === target
console.log(build ? 'Build authorized recovery target.' : 'Skip deployment outside the authorized recovery project.')
process.exitCode = build ? 1 : 0
