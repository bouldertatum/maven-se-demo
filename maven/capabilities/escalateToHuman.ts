/**
 * Maven Custom Action: escalateToHuman
 * Example props: {
 *   "customerId": "CUST-DEMO-001",
 *   "reason": "credit_approval",
 *   "requestedCreditAmount": 327,
 *   "summary": "Traveler in France; registration refreshed; $327 charge disputed.",
 *   "evidence": ["International roaming enabled", "Stale registration found", "Refresh OP-DEMO-001 succeeded"]
 * }
 * Required App Settings: API_BASE_URL, API_TOKEN
 */
type Args = {
  props: {
    customerId?: string;
    reason?: string;
    requestedCreditAmount?: number;
    summary?: string;
    evidence?: string[];
  };
  context: Record<string, unknown>;
  settings: { API_BASE_URL?: string; API_TOKEN?: string };
};

export default async function escalateToHuman({ props, settings }: Args) {
  if (!props.customerId || !props.reason || !props.summary) {
    return { ok: false, code: "invalid_input", message: "customerId, reason, and summary are required" };
  }
  if (!settings.API_BASE_URL || !settings.API_TOKEN) {
    return { ok: false, code: "configuration_error", message: "The case system is not configured" };
  }

  const response = await fetch(`${settings.API_BASE_URL}/escalations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${settings.API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerId: props.customerId,
      reason: props.reason,
      requestedCreditAmount: props.requestedCreditAmount,
      summary: props.summary,
      evidence: props.evidence ?? [],
    }),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    return { ok: false, code: body.code ?? `upstream_${response.status}`, retryable: response.status >= 500 };
  }

  return { ok: true, escalation: body };
}
