# Demo build and presentation runbook

## 1. Prepare the synthetic API

1. Run `npm test`.
2. Start the service with `npm run dev`.
3. Confirm `GET /health` returns `ok`.
4. Keep the API base URL and token outside source control.

For a remote Maven sandbox, expose the API through an approved HTTPS development endpoint. Do not use a real customer system or credential.

## 2. Create the Maven agent

1. In Agent Designer, create a net-new agent for the interview demo.
2. Create a foundational Charter using `maven/charters/global-service-rules.md`.
3. Add an Intelligent Field named `support_intent` and allow the value `international_roaming`.
4. Add an Intelligent Field named `requested_credit_amount` as a number.
5. Create the roaming and financial-control Charters from this repository.

## 3. Add Knowledge

Create or upload each file under `maven/knowledge/` as a separate source. Keep the content concise and topic-specific. Explicitly reference the relevant sources from the roaming and financial-control Charters.

## 4. Add Actions

For each file under `maven/capabilities/`:

1. Create an Action capability with the matching name and description.
2. Select the built-in code editor and paste the single TypeScript file.
3. Add `API_BASE_URL` and `API_TOKEN` in App Settings.
4. Run the Action with the example input in its header comment.
5. Save only after the response shape and error path are verified.
6. Set LLM Inclusion to **When Relevant**.
7. Reference the Action from the appropriate Charter.

## 5. Validate in Simulator

Use customer `CUST-DEMO-001`. Turn on **Show Reasoning** and verify:

- the roaming Charter matches;
- only referenced Knowledge is reviewed;
- customer and network lookups precede any mutation;
- the network refresh asks for confirmation;
- the `$327` credit request never exposes an automatic financial action; and
- escalation contains the evidence a human needs.

## 6. Run evaluations

Import `maven/test-suites/roaming-evaluation.csv`. Run the full suite after every Charter, Knowledge, or Action change. Record the date, pass rate, important failures, and remediation in `docs/decisions.md`.

## 7. Live presentation path

Target live-demo time: 7–9 minutes.

1. Start with the customer message: “I’m in France, my phone barely works, and I see a `$327` roaming charge.”
2. Show the response grounded in customer context and policy.
3. Confirm the safe network refresh and show the successful result.
4. Ask for the `$327` adjustment; show the controlled escalation.
5. Open Show Reasoning to reveal Knowledge and Actions used.
6. Open the Test Suite results to move from anecdote to proof.

## 8. Fallback plan

Before the panel, capture redacted screenshots or a short recording of:

- the Charter tree;
- the successful conversation;
- Show Reasoning evidence;
- the escalation result; and
- the Test Suite summary.

If the live environment fails, narrate the same sequence using these artifacts and explain the diagnosed boundary rather than hiding it.

