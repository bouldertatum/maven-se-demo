# Network Registration Recovery

A stale registration means the line's expected roaming authorization is not reflected in the current visited-network session.

The `refreshNetworkRegistration` Action is designed to be:

- reversible;
- scoped to one authenticated customer line;
- explicitly confirmed by the customer;
- idempotent when the same request key is reused; and
- auditable through the returned operation ID.

After a successful refresh, ask the customer to toggle airplane mode for 10 seconds and retry data. Do not state that connectivity is restored until the customer confirms or a downstream network check verifies it.

