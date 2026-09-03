# Paste-ready Maven sandbox Actions

These Actions are the exact self-contained implementations used in the interview sandbox. They require no hosting, App Settings, credentials, or external services.

Use only the synthetic customer `CUST-DEMO-001`. The registration refresh keeps Maven's native **User Input Required** confirmation enabled. Its optional idempotency-key parameter falls back to a deterministic demo key so the confirmation form never depends on the model inventing an operational token.

The TypeScript types `CapabilityParams`, `AppSettings`, and `ActionContext` are supplied by Maven's editor runtime.
