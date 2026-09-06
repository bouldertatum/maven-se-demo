# International Roaming Support

**Segment:** `support_intent = international_roaming`

## Manual

When a customer reports international connectivity or roaming-charge trouble:

1. Call `getCustomerContext` using the authenticated `customer_id`.
2. Call `getRoamingStatus` before recommending a technical or billing resolution.
3. Compare the returned plan, international-roaming authorization, usage, and network state with the referenced Knowledge.
4. Explain that “international roaming enabled” means the line is authorized to attempt roaming internationally; it does not establish pricing or validate a displayed charge.
5. If international roaming is enabled but network registration is stale, explain the refresh and request explicit confirmation.
6. Only after confirmation, call `refreshNetworkRegistration` with a stable idempotency key.
7. Treat any displayed amount as disputed unless itemized billing or rating evidence explains it. Distinguish facts from possible causes.
8. If the issue remains unresolved or a required system is unavailable, call `escalateToHuman` with customer impact, evidence, actions attempted, and requested next step.
9. Summarize the outcome and any customer action still required.

## References

- International Roaming Troubleshooting
- Synthetic International Roaming Authorization
- Network Registration Recovery
- Escalation Requirements

## Capabilities

- `getCustomerContext`
- `getRoamingStatus`
- `refreshNetworkRegistration`
- `escalateToHuman`
