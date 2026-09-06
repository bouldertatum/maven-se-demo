export default async function (input: {
  params: CapabilityParams
  settings: AppSettings
  context: ActionContext
}) {
  const { customerId } = input.params

  if (customerId !== "CUST-DEMO-001") {
    return {
      ok: false,
      code: "customer_not_found",
      message: "No synthetic roaming record was found",
    }
  }

  return {
    ok: true,
    roaming: {
      customerId,
      internationalRoaming: {
        enabled: true,
        authorizationStatus: "enabled",
        meaning:
          "The line is allowed to attempt international roaming; this does not validate pricing or charges.",
      },
      visitedNetwork: "FR-DEMO-MOBILE",
      registrationState: "stale",
      usage: {
        dataMb: 184,
        callsMinutes: 7,
        texts: 3,
        billingSessionStartedAt: "2026-09-02T08:15:00Z",
      },
      disputedChargeUsd: 327,
    },
  }
}
