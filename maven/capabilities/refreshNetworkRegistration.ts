/**
 * Maven Custom Action: refreshNetworkRegistration
 * Example props: {
 *   "customerId": "CUST-DEMO-001",
 *   "confirmed": true,
 *   "idempotencyKey": "demo-refresh-001"
 * }
 * Required App Settings: API_BASE_URL, API_TOKEN
 */
type Args = {
  props: { customerId?: string; confirmed?: boolean; idempotencyKey?: string };
  context: Record<string, unknown>;
  settings: { API_BASE_URL?: string; API_TOKEN?: string };
};

export default async function refreshNetworkRegistration({ props, settings }: Args) {
  if (!props.customerId || !props.idempotencyKey) {
    return { ok: false, code: "invalid_input", message: "customerId and idempotencyKey are required" };
  }
  if (props.confirmed !== true) {
    return { ok: false, code: "confirmation_required", message: "Explicit customer confirmation is required" };
  }
  if (!settings.API_BASE_URL || !settings.API_TOKEN) {
    return { ok: false, code: "configuration_error", message: "The network system is not configured" };
  }

  const response = await fetch(
    `${settings.API_BASE_URL}/customers/${encodeURIComponent(props.customerId)}/network-registration/refresh`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${settings.API_TOKEN}`,
        "Content-Type": "application/json",
        "Idempotency-Key": props.idempotencyKey,
      },
      body: JSON.stringify({ confirmed: true }),
    },
  );

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    return { ok: false, code: body.code ?? `upstream_${response.status}`, retryable: response.status >= 500 };
  }

  return { ok: true, result: body };
}

