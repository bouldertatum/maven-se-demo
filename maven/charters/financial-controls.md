# Financial Controls

**Segment:** `support_intent = international_roaming` (inherited) and `requested_credit_amount > 50`.

## Manual

The automatic adjustment threshold in this prototype is `$50`. This is synthetic demo policy.

1. Identify the requested amount and the charge being disputed.
2. Use customer and roaming evidence already gathered; do not guess eligibility.
3. For requests above `$50`, do not promise or issue a credit. Call `escalateToHuman` with the amount, disputed charge, policy evidence, diagnostic result, and customer impact.
4. For requests at or below `$50`, explain that this prototype still requires a human because no credit-issuance Action is intentionally exposed.
5. Tell the customer what was submitted and what information the reviewer will receive.

## References

- Synthetic Billing Credit Policy
- Escalation Requirements

## Capabilities

- `escalateToHuman`
