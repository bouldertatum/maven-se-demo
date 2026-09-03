export default async function (input: {
  params: CapabilityParams
  settings: AppSettings
  context: ActionContext
}) {
  const { customerId, reason, requestedCreditAmount, summary, evidence } = input.params

  if (customerId !== "CUST-DEMO-001") {
    return { ok: false, code: "customer_not_found", retryable: false }
  }
  if (!reason || !summary || !evidence) {
    return { ok: false, code: "required_evidence_missing", retryable: false }
  }

  const amount = typeof requestedCreditAmount === "number" ? requestedCreditAmount : 0
  const evidenceItems = evidence
    .split(";")
    .map((item: string) => item.trim())
    .filter(Boolean)

  return {
    ok: true,
    escalation: {
      caseNumber: "CASE-DEMO-" + String(1000 + Math.round(amount || 1)),
      status: "queued_for_human_review",
      reason,
      requestedCreditAmount: amount || null,
      thresholdExceeded: amount > 50,
      summary,
      evidence: evidenceItems,
      decisionNeeded: amount > 50 ? "Human financial approval" : "Human support review",
    },
  }
}
