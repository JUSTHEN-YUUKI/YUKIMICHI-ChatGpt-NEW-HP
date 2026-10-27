# Managed runtime mitigation verification (Preview only)

This diagnostic does not restore inquiry sending and does not change the Node
patch gate, SMTP implementation, environment variables, or production behavior.

On a Vercel-authenticated Preview, open:

`/api/runtime-check?probe=managed-brotli`

The existing route returns 404 outside Preview, before importing the probe. Keep
Deployment Protection enabled. No deployment protection bypass is added.

The probe binds an ephemeral listener to 127.0.0.1 and requests two fixed local
responses with fetch: a plaintext control, and valid Brotli of the same known
string. Each fetch has a 1.5 second timeout, and the listener/connections are
closed in a finally block. No remote host, credential, inquiry data, URL supplied
by a user, or malformed compressed data is involved. The Brotli request explicitly
advertises br so the echoed boolean can also describe request-header handling.

`responseProtectionObserved` requires a matching plain control and a rejected
Brotli request that did not simply time out. Failure to run the control is
inconclusive. A false result is not proof that a patched Node is vulnerable.
This verifies only the observed fetch path; it does not establish all managed
runtime protections or remediate other Node security issues. The actual Node
version and `patched` result remain independent and unchanged.

On local patched Node 24.22.1 without Vercel's mitigation, the control and Brotli
responses both match and responseProtectionObserved is false. This is a negative
control for the platform mitigation, not a vulnerability test.

Official platform mitigation description:
https://vercel.com/kb/bulletin/node-js-security-advisory
