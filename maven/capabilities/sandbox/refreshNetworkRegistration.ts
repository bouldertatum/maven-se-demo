export default async function (input: {
  params: CapabilityParams
  settings: AppSettings
  context: ActionContext
}) {
  const { customerId } = input.params

  if (customerId !== "CUST-DEMO-001") {
    return { ok: false, code: "customer_not_found", retryable: false }
  }

  const suppliedKey = input.params.idempotencyKey
  const idempotencyKey =
    suppliedKey && suppliedKey.length >= 6
      ? suppliedKey
      : "roaming-refresh-" + customerId

  const suffix = idempotencyKey.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase()

  return {
    ok: true,
    result: {
      operationId: "OP-" + (suffix || "DEMO0001"),
      customerId,
      previousState: "stale",
      currentState: "refreshed",
      idempotencyKeyAccepted: true,
      customerNextStep: "Toggle airplane mode for 10 seconds and retry data",
    },
  }
}
