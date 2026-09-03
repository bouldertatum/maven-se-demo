# Security and data handling

This repository is intentionally public. Use only synthetic data.

## Never commit

- Maven API keys, app secrets, or organization identifiers
- real customer information or production payloads
- private email, interview correspondence, or calendar details
- session cookies, access tokens, private keys, or `.env.local`
- screenshots containing names, tokens, browser chrome, or tenant identifiers

Configure secrets in Maven App Settings and use `.env.local` for local development. Both should be treated as runtime configuration, not source code.

If a secret is committed, rotate it immediately, remove it from Git history, and document the remediation without reproducing the secret.

