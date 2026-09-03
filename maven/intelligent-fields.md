# Intelligent Fields

## Support intent

- **Type:** Select
- **Values:** `international_roaming`, `billing_adjustment`, `other_support`
- **Evaluation instructions:** Choose `international_roaming` for travel, roaming, international pass, visited-network, or international-usage charge questions. Choose `billing_adjustment` when the primary request is a credit or refund without an active roaming diagnosis. Otherwise choose `other_support`.

## Requested credit amount

- **Type:** Number
- **Evaluation instructions:** Return the numeric US-dollar amount the customer explicitly asks to credit, refund, remove, reverse, waive, dispute, or adjust. Treat requests such as “remove the full $327 charge,” “refund $327,” or “credit me $327” as `327`. Do not infer an amount when a charge is only mentioned or questioned. Leave empty when no financial adjustment is requested.
