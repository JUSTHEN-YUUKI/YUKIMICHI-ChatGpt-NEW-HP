# Existing Sakura SMTP form delivery

No SendGrid subscription, paid email API, DNS update, or mailbox/password change is required by this implementation. Existing public pages, field definitions, optional quantity, FormData input collection, translations, pricing, and admin restrictions are retained.

## Verified historical baseline

- Pre-maintenance main: `68755509d082f35924985dd30f551455d3f4052d`.
- Security-fixed restoration baseline: `7a9051197bc31e45c23f102384fb0b4f8e1338a2`.
- Contact and Quote field definitions were not removed by maintenance. The maintenance changes added submission gating and a notice.
- The previous API provided an administrator notification and customer acknowledgement. Keep the security-fixed acknowledgement limited to reference/type/time instead of reflecting arbitrary customer text to third parties.
- Existing language definitions are Japanese, English, Chinese, and Spanish. The language switch UI was already disabled before maintenance. Do not add Thai or a new switch UI as part of recovery.
- The existing form uses a photo/document URL, not a new binary attachment upload endpoint.
- The existing production `/admin/outbound` restriction remains in place. Do not expose the development-only admin page as a substitute for authentication.

## Owner configuration (secrets stay in Vercel)

Open the exact project:

https://vercel.com/justhen-yuukis-projects/yukimichi-chat-gpt-new-hp-cxx6/settings/environment-variables

In **Settings → Environment Variables**, select **Production**, then enter:

| Name | Value / source |
| --- | --- |
| SMTP_HOST | Initial domain confirmed in the Sakura server control panel / contract notice, e.g. `your-contract.sakura.ne.jp`. MX alone is not proof of SMTP credentials. |
| SMTP_PORT | `587` |
| SMTP_USER | `exporter@justhen.co.jp`, an existing mailbox with its own authentication |
| SMTP_PASSWORD | Existing password for that mailbox, entered directly by the owner; mark Sensitive |
| SMTP_FROM | `exporter@justhen.co.jp` |
| CONTACT_NOTIFICATION_EMAIL | `exporter@justhen.co.jp` |
| MAINTENANCE_MODE | `off` (public pages remain available) |
| INQUIRY_MODE | Keep `off` until the deployed runtime and delivery tests below pass |

Never paste passwords into chat, source files, shell arguments, GitHub, or logs. Do not extract Outlook credentials. `SMTP_PASS` from the previous provider is deliberately ignored; it is not proof of a Sakura password. Password whitespace is preserved. SMTP sender and authentication account must be the same approved mailbox in this implementation.

## Preview validation

1. Keep Vercel Deployment Protection enabled. Confirm authentication is required before setting `MAINTENANCE_PREVIEW_SITE_ENABLED=on` on this branch's Preview environment.
2. Add the confirmed SMTP settings to this branch's Preview only, through the owner's safe settings interface. Default `SMTP_PREVIEW_SEND=off` performs DNS/TCP/STARTTLS/authentication verification, without sending any mail. A valid Contact/Quote POST returns HTTP409 `SMTP_VERIFIED_NO_DELIVERY`, `ok:false`; it is not successful inquiry delivery.
3. Open `/api/runtime-check` inside the authenticated Preview. Node must be at least `24.22.1` or `22.23.4`; the supported major is deliberately explicit. A build log's version is not Function evidence. `/api/inquiry/status` also logs the actual Function version once per instance, without customer data, and returns only `{available:boolean}`.
4. For an authorized real trial, set branch-specific `SMTP_PREVIEW_SEND=on` and redeploy. Submit both forms with the customer email **also** set to `exporter@justhen.co.jp`. Other preview recipients are refused before SMTP. Administrator notification and acknowledgement therefore both go to the owner. The legacy Preview `INQUIRY_EMAIL_SANDBOX=on` always overrides delivery and verifies only.
5. Check all input values in the administrator email, its Reply-To, and the fixed acknowledgement. Check Unicode text and optional blank quantity. Check missing required fields, failures, retained input, and mobile layout.
6. Record SMTP acceptance separately from inbox receipt. Nodemailer's `verify()` proves authentication/connectivity only, not sender permission or delivery; `sendMail()` acceptance alone does not prove inbox receipt.

## Production release

The repository is connected to multiple Vercel projects. `vercel.json` uses an ignored-build command that builds only `prj_qSdp3iNVTw2uI7RXlhiCX3hZnwUH`. Other/unknown project identities are skipped, preserving their published deployments. Keep Vercel system environment variables exposed on the target so its identity can be checked.

1. Record the current Ready Production deployment and immutable commit for rollback. Keep all existing security fixes.
2. Deploy a production candidate with `INQUIRY_MODE=off` and without assigning official domains, when Vercel access is available. Check `/api/inquiry/status` and the candidate's runtime logs. Do not weaken the Node safety gate if the managed Function is still unpatched.
3. Only after authenticated Preview mail tests and receipt confirmation, set Production `INQUIRY_MODE=on`, create a **new Production deployment**, and verify the actual Function again. Environment edits do not update an old deployment.
4. Submit owner-only Contact and Quote trials through the official domains. Confirm API JSON success, accepted administrator mail, actual inbox receipt, correct content and Reply-To, and acknowledgement. Test API rejection and retained form values without flooding the rate limit (10 attempts/hour/IP).
5. `/api/inquiry/status` must report available before a hydrated form enables its button. It never exposes environment values, customer content, or versions publicly. When unavailable the existing official-email alternative remains visible.
6. Remove/turn off branch-specific preview delivery flags after testing. `SENDGRID_SANDBOX_VERIFY` is obsolete and no longer runs at build time. Existing SendGrid credentials are unused and need not be exposed or rotated for this change.
7. Verify Ready, both official domains, unchanged public pages/pricing, existing production admin restriction, logs, and smartphone layout. Record exact deployment/commit IDs and the test/inbox outcomes.

## Failure diagnosis

Logs contain bounded SMTP codes and numeric 4xx/5xx response codes only. `EDNS`/`ENOTFOUND`: confirm the contractual initial hostname. `ECONNECTION`/`ECONNREFUSED`/`ETIMEDOUT`: check TCP587 and server restrictions. `ETLS`/`ESOCKET`: investigate STARTTLS and the certificate chain/hostname; do not disable validation. `EAUTH`/535: owner verifies mailbox/user/password in the safe interface. `EENVELOPE`/`ERECIPIENT`: sender/recipient permission or server policy. Do not log raw provider errors or make DNS/SPF/DKIM/DMARC changes automatically.

An optional local authentication-only diagnostic is `node --env-file=.env.local scripts/verify-smtp.mjs` on a patched Node. It sends no mail and is not a substitute for a Function test. Do not pull production passwords to the workstation merely to run it.

## Official sources

- https://help.sakura.ad.jp/mail/2114/
- https://vercel.com/kb/guide/serverless-functions-and-smtp
- https://nodemailer.com/smtp
- https://nodejs.org/en/blog/vulnerability/october-2026-security-releases
- https://vercel.com/kb/bulletin/node-js-security-advisory
