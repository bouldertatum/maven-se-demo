import http from "node:http";
import { pathToFileURL } from "node:url";

const customer = {
  customerId: "CUST-DEMO-001",
  displayName: "Jordan Lee",
  line: "+1-555-010-0199",
  authenticated: true,
  plan: {
    name: "Unlimited Premium (Synthetic)",
    internationalDayPassEligible: true,
  },
  destination: "France",
};

const roaming = {
  customerId: "CUST-DEMO-001",
  internationalDayPass: { enrolled: true, status: "active" },
  visitedNetwork: "FR-DEMO-MOBILE",
  registrationState: "stale",
  usage: {
    dataMb: 184,
    callsMinutes: 7,
    texts: 3,
    billingSessionStartedAt: "2026-09-02T08:15:00Z",
  },
  disputedChargeUsd: 327,
};

const refreshes = new Map();
let nextCaseNumber = 1001;

function json(response, status, body) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  if (chunks.length === 0) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return null;
  }
}

function isAuthorized(request) {
  const expected = process.env.DEMO_API_TOKEN ?? "demo-token";
  return request.headers.authorization === `Bearer ${expected}`;
}

export function resetState() {
  refreshes.clear();
  nextCaseNumber = 1001;
}

export function createServer() {
  return http.createServer(async (request, response) => {
    const url = new URL(request.url ?? "/", "http://localhost");

    if (request.method === "GET" && url.pathname === "/health") {
      return json(response, 200, { status: "ok", service: "synthetic-telecom-api" });
    }

    if (!isAuthorized(request)) {
      return json(response, 401, { code: "not_authorized", message: "A valid demo token is required" });
    }

    const contextMatch = url.pathname.match(/^\/customers\/([^/]+)\/context$/);
    if (request.method === "GET" && contextMatch) {
      if (decodeURIComponent(contextMatch[1]) !== customer.customerId) {
        return json(response, 404, { code: "customer_not_found" });
      }
      return json(response, 200, customer);
    }

    const roamingMatch = url.pathname.match(/^\/customers\/([^/]+)\/roaming$/);
    if (request.method === "GET" && roamingMatch) {
      if (decodeURIComponent(roamingMatch[1]) !== customer.customerId) {
        return json(response, 404, { code: "customer_not_found" });
      }
      return json(response, 200, roaming);
    }

    const refreshMatch = url.pathname.match(/^\/customers\/([^/]+)\/network-registration\/refresh$/);
    if (request.method === "POST" && refreshMatch) {
      if (decodeURIComponent(refreshMatch[1]) !== customer.customerId) {
        return json(response, 404, { code: "customer_not_found" });
      }

      const idempotencyKey = request.headers["idempotency-key"];
      if (typeof idempotencyKey !== "string" || idempotencyKey.length < 6) {
        return json(response, 400, { code: "idempotency_key_required" });
      }

      const body = await readJson(request);
      if (!body || body.confirmed !== true) {
        return json(response, 400, { code: "confirmation_required" });
      }

      if (refreshes.has(idempotencyKey)) {
        return json(response, 200, { ...refreshes.get(idempotencyKey), replayed: true });
      }

      const result = {
        operationId: `OP-${String(refreshes.size + 1).padStart(4, "0")}`,
        customerId: customer.customerId,
        previousState: roaming.registrationState,
        currentState: "refreshed",
        completedAt: new Date().toISOString(),
        replayed: false,
      };
      refreshes.set(idempotencyKey, result);
      return json(response, 200, result);
    }

    if (request.method === "POST" && url.pathname === "/escalations") {
      const body = await readJson(request);
      if (!body?.customerId || !body?.reason || !body?.summary) {
        return json(response, 400, { code: "required_fields_missing" });
      }
      if (body.customerId !== customer.customerId) {
        return json(response, 404, { code: "customer_not_found" });
      }

      const caseNumber = `CASE-DEMO-${nextCaseNumber++}`;
      return json(response, 201, {
        caseNumber,
        status: "queued_for_human_review",
        reason: body.reason,
        requestedCreditAmount: body.requestedCreditAmount ?? null,
        evidenceCount: Array.isArray(body.evidence) ? body.evidence.length : 0,
      });
    }

    return json(response, 404, { code: "route_not_found" });
  });
}

const launchedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (launchedDirectly) {
  const port = Number(process.env.PORT ?? 8787);
  createServer().listen(port, "127.0.0.1", () => {
    console.log(`Synthetic telecom API listening on http://127.0.0.1:${port}`);
  });
}

