# Discovery hypothesis

## Customer and problem

Working customer: a Tier-1 U.S. wireless carrier, presented with AT&T-style public policy context and fully synthetic systems.

International travelers often contact support when service is unreliable and charges are confusing. Resolution requires plan entitlements, roaming enrollment, network state, usage, policy, and action permissions that typically live in different tools.

## Stakeholders

- Customer care leadership: lower transfers and repeat contacts.
- Digital/product leadership: higher self-service containment without harming trust.
- Operations: safe, auditable actions and clean escalation packets.
- Security/legal: least privilege, synthetic demo data, and traceable policy.
- Frontline agents: fewer swivel-chair steps and clearer explanations.

## Prioritized needs

1. Correctly identify the customer, plan, and travel context.
2. Resolve the connectivity issue in the same conversation when safe.
3. Explain charges with grounded policy evidence.
4. Respect financial approval limits and preserve human judgment.
5. Make behavior measurable through repeatable evaluations.

## Discovery questions to narrate

- Which roaming contacts create the most transfers or repeat calls?
- Which systems are authoritative for entitlements, network state, usage, and credits?
- Which actions are reversible, and which require approval?
- What is the current credit threshold by channel and agent role?
- What evidence must be retained for audit and coaching?
- What quality bar would justify expanding beyond this first use case?

## Explicit assumptions

- The user is authenticated before the agent receives `customer_id`.
- `$50` is a synthetic demonstration threshold, not a claim about a real carrier policy.
- The mock API is representative of system boundaries, not a production integration.
- A human owns the final decision for a `$327` requested adjustment.

