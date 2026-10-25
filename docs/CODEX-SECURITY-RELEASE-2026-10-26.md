# Codex task: JUSTHEN emergency security maintenance recovery (2026-10-26)

Target repository: JUSTHEN-YUUKI/YUKIMICHI-ChatGpt-NEW-HP
Production domain: https://justhen.co.jp
Stack: Next.js on Vercel, domain registered at Star Domain, mail service at Sakura Internet. Do not change registrar DNS or Sakura mail/MX/SPF/DKIM/DMARC.
Branch: security/nextjs-oct2026-preflight

## Owner authorization and release objective
The site owner requested security remediation, end-to-end verification, and reopening production. **Reopening is conditional on passing all security, functional, and deployment checks below. Never remove the production maintenance lock until all gates are met, and do not claim production live unless verified.**

## Current verified state
- Base main commit: 8b697539e2e55b1053266fbbd0a0d689692fd425
- package.json initially pinned next 15.3.9 and eslint-config-next 15.3.9; package-lock.json pinned next 15.3.9.
- The preflight branch updates package.json to next and eslint-config-next 15.5.28 and react/react-dom 19.2.9. **Validate these version numbers and current security advisories against authoritative vendor releases; revise to the latest verified compatible patched versions where necessary.**
- lib/maintenance.ts: PRODUCTION_MAINTENANCE_LOCK=true. middleware.ts intercepts all routes; maintenance HTTP tests exist.
- The currently connected Vercel account only exposes the unrelated su koyaka-shokudo project. **The actual JUSTHEN Vercel team/project is not accessible from the assistant connection. Find and verify the correct project credentials/team before any deployment. Never create a new project or switch the site's DNS as a workaround.**
- No Codex direct task-submission capability is available from the chat.

## Implementation
1. Read all code affecting middleware, security, form handling, auth/admin, secrets, HTTP headers, runtime, and the site release path. Identify whether PHP exists anywhere behind the domain or at an upstream service; do not assume a PHP issue applies to this Next.js application.
2. Consult official Next.js/React/npm security advisories and confirm patched versions. Update package.json and regenerate package-lock.json with a clean compatible npm install, preserving integrity hashes; never manually fake lockfile integrity. Run npm ci, npm audit --omit=dev, test suite, TypeScript checking, lint and production build. Record any failing findings.
3. Investigate additional vulnerable dependencies, unexpected changes, supply-chain risk, credential exposure, GitHub Action/CI configuration, authentication and admin routes. Where indicated by incidents, rotate secrets using provider-managed controls without displaying secrets in logs/PR.
4. Keep PRODUCTION_MAINTENANCE_LOCK=true while building and reviewing. Ensure 503 responses and inquiry isolation tests pass in all browsers, including Yahoo in-app browser behavior. Inspect no accidental publicly accessible previews. Add/adjust tests as appropriate.
5. Verify correct Vercel account/project and production domain mapping; use preview or protected staged production to validate main site pages, navigation, language pages, mobile layout, images, contact/quote flow and SendGrid configuration without issuing test mail to buyers. Do not alter Sakura mail settings.
6. After all security + build + integration checks pass and the target project is confirmed, update maintenance code and its tests for a controlled reopening, deploy using a safe release mechanism to the *existing* Vercel project, verify HTTP 200 for public pages, correct 4xx for unknown routes, secured admin, HTTP 503 no longer appearing, and functional inquiry forms. Verify site and email independently.
7. If deployment fails, stop release and restore a tested maintenance build. If target ownership, production settings, or security state cannot be verified, leave maintenance enabled and report exact blocker rather than guessing.
8. Deliver a precise report of version changes, CVEs/advisories with URLs, npm audit and test/build results, SHA/deployment ID, URL, production headers/status, rollback plan, and remaining risk.

## CI/release gates
- Valid up-to-date lockfile after npm install.
- npm ci, test, typecheck, build all pass.
- No untriaged critical/high vulnerabilities affecting deployed execution.
- Existing production Vercel team/project and justhen.co.jp domain ownership confirmed.
- Production secrets protected; no exfiltration or logging.
- Site functional tests passed on candidate build.
- Production lock released **only as the final controlled action** with monitoring and immediate rollback available.

Current status: Instructions staged for Codex. NOT proof that Codex received the instruction or that production was reopened.
