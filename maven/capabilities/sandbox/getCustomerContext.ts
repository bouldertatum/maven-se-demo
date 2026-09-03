export default async function (input: {
  params: CapabilityParams
  settings: AppSettings
  context: ActionContext
}) {
  const { customerId } = input.params

  if (!customerId) {
    return { ok: false, code: "invalid_input", message: "customerId is required" }
  }
  if (customerId !== "CUST-DEMO-001") {
    return {
      ok: false,
      code: "customer_not_found",
      message: "No authenticated synthetic customer was found",
    }
  }

  return {
    ok: true,
    customer: {
      customerId: "CUST-DEMO-001",
      displayName: "Jordan Lee",
      line: "+1-555-010-0199",
      authenticated: true,
      destination: "France",
      plan: {
        name: "Unlimited Premium (Synthetic)",
        internationalDayPassEligible: true,
      },
    },
  }
}
