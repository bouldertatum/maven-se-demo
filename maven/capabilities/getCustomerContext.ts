/**
 * Maven Custom Action: getCustomerContext
 * Example props: { "customerId": "CUST-DEMO-001" }
 * Required App Settings: API_BASE_URL, API_TOKEN
 */
type Args = {
  props: { customerId?: string };
  context: Record<string, unknown>;
  settings: { API_BASE_URL?: string; API_TOKEN?: string };
};

export default async function getCustomerContext({ props, settings }: Args) {
  if (!props.customerId) return { ok: false, code: "invalid_input", message: "customerId is required" };
  if (!settings.API_BASE_URL || !settings.API_TOKEN) {
    return { ok: false, code: "configuration_error", message: "The customer system is not configured" };
  }

  const response = await fetch(
    `${settings.API_BASE_URL}/customers/${encodeURIComponent(props.customerId)}/context`,
    { headers: { Authorization: `Bearer ${settings.API_TOKEN}` } },
  );

  if (!response.ok) {
    return { ok: false, code: `upstream_${response.status}`, retryable: response.status >= 500 };
  }

  return { ok: true, customer: await response.json() };
}

