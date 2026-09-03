# SE Debug View specification

This optional companion view translates raw demo events into an executive-friendly proof panel. It should not expose hidden chain-of-thought. It displays observable evidence only.

## Minimum panels

1. **Conversation state** — customer intent, destination, requested credit, confirmation state.
2. **Charter route** — foundational, roaming support, and financial-control matches.
3. **Evidence** — Knowledge sources cited and API facts returned.
4. **Action ledger** — Action name, timestamp, status, duration, idempotency key suffix, operation/case ID.
5. **Guardrails** — confirmation gate and `$50` synthetic threshold outcome.
6. **Evaluation result** — expected behavior, actual behavior, and pass/fail.

## Display rule

Use synthetic identifiers and redact credentials. Show why a decision is trustworthy through retrieved evidence and observable tool results, not private model reasoning.

