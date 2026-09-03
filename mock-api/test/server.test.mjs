import assert from "node:assert/strict";
import { after, before, beforeEach, test } from "node:test";
import { createServer, resetState } from "../server.mjs";

let server;
let baseUrl;
const headers = { Authorization: "Bearer demo-token" };

before(async () => {
  server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
});

beforeEach(() => resetState());

test("health endpoint does not require authorization", async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).status, "ok");
});

test("protected endpoints reject missing authorization", async () => {
  const response = await fetch(`${baseUrl}/customers/CUST-DEMO-001/context`);
  assert.equal(response.status, 401);
  assert.equal((await response.json()).code, "not_authorized");
});

test("returns synthetic customer and roaming context", async () => {
  const contextResponse = await fetch(`${baseUrl}/customers/CUST-DEMO-001/context`, { headers });
  const roamingResponse = await fetch(`${baseUrl}/customers/CUST-DEMO-001/roaming`, { headers });
  assert.equal(contextResponse.status, 200);
  assert.equal((await contextResponse.json()).plan.internationalDayPassEligible, true);
  assert.equal(roamingResponse.status, 200);
  assert.equal((await roamingResponse.json()).registrationState, "stale");
});

test("network refresh requires confirmation and is idempotent", async () => {
  const endpoint = `${baseUrl}/customers/CUST-DEMO-001/network-registration/refresh`;
  const actionHeaders = {
    ...headers,
    "Content-Type": "application/json",
    "Idempotency-Key": "refresh-test-001",
  };

  const denied = await fetch(endpoint, {
    method: "POST",
    headers: actionHeaders,
    body: JSON.stringify({ confirmed: false }),
  });
  assert.equal(denied.status, 400);

  const first = await fetch(endpoint, {
    method: "POST",
    headers: actionHeaders,
    body: JSON.stringify({ confirmed: true }),
  });
  const firstBody = await first.json();
  assert.equal(first.status, 200);
  assert.equal(firstBody.replayed, false);

  const replay = await fetch(endpoint, {
    method: "POST",
    headers: actionHeaders,
    body: JSON.stringify({ confirmed: true }),
  });
  const replayBody = await replay.json();
  assert.equal(replay.status, 200);
  assert.equal(replayBody.operationId, firstBody.operationId);
  assert.equal(replayBody.replayed, true);
});

test("creates a structured human escalation", async () => {
  const response = await fetch(`${baseUrl}/escalations`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      customerId: "CUST-DEMO-001",
      reason: "credit_approval",
      requestedCreditAmount: 327,
      summary: "Synthetic disputed roaming charge",
      evidence: ["Day Pass enabled", "Usage found"],
    }),
  });
  const body = await response.json();
  assert.equal(response.status, 201);
  assert.match(body.caseNumber, /^CASE-DEMO-/);
  assert.equal(body.status, "queued_for_human_review");
  assert.equal(body.evidenceCount, 2);
});

