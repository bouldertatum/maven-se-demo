# International Roaming Support

**Segment:** `support_intent = international_roaming`

## Manual

When a customer reports international connectivity or roaming-charge trouble:

1. Call `getCustomerContext` using the authenticated `customer_id`.
2. Call `getRoamingStatus` before recommending a technical or billing resolution.
3. Compare the returned plan, enrollment, usage, and network state with the referenced Knowledge.
4. If roaming is enabled but network registration is stale, explain the refresh and request explicit confirmation.
5. Only after confirmation, call `refreshNetworkRegistration` with a stable idempotency key.
6. Explain charges using the synthetic Day Pass and usage evidence. Distinguish facts from possible causes.
7. If the issue remains unresolved or a required system is unavailable, call `escalateToHuman` with customer impact, evidence, actions attempted, and requested next step.
8. Summarize the outcome and any customer action still required.

## References

- International Roaming Troubleshooting
- Synthetic International Day Pass
- Network Registration Recovery
- Escalation Requirements

## Capabilities

- `getCustomerContext`
- `getRoamingStatus`
- `refreshNetworkRegistration`
- `escalateToHuman`

