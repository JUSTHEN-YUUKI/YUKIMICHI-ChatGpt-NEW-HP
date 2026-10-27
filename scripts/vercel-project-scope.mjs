// This repository is linked to more than one Vercel project. Only the owner's
// named target may build this recovery. Vercel ignoreCommand: 0 skips, 1 builds.
// Owner's 2026-10-28 scope: yukimichi-chat-gpt-new-hp only. The cxx6
// project serving the formal domains must not receive this release.
const target = 'prj_Ns0akrPUBHdxKuX8U1BEiGtZWudq'
const build = process.env.VERCEL_PROJECT_ID === target
console.log(build ? 'Build authorized recovery target.' : 'Skip deployment outside the authorized recovery project.')
process.exitCode = build ? 1 : 0
