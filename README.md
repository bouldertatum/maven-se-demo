# Maven SE Demo: Trusted Wireless Support

An independent interview prototype showing how a Maven AGI agent can resolve a complex international-roaming support issue across knowledge, customer context, network state, and governed actions.

> **Important:** This project is not affiliated with or endorsed by Maven AGI or AT&T. All customers, accounts, systems, policies, and transactions are synthetic. Brand references are used only to ground an interview scenario in a recognizable business context.

## Demo story

A customer traveling in France reports unreliable service and an unexpected roaming charge. The agent:

1. identifies the authenticated customer and current plan;
2. checks roaming enrollment and network registration;
3. explains the relevant policy in plain language;
4. safely refreshes network registration;
5. refuses to auto-issue a requested `$327` credit because it exceeds a synthetic `$50` approval threshold; and
6. creates a structured human escalation with evidence and next steps.

This sequence demonstrates Maven's core value proposition: **search, reason, act, and prove**—with controls around what the agent is allowed to know and do.

## Repository map

```text
docs/                    Discovery, architecture, runbook, and success criteria
maven/charters/          Source-of-truth Charter instructions
maven/knowledge/         Compact synthetic support references
maven/capabilities/      External-API adapters plus paste-ready sandbox Actions
maven/test-suites/       Evaluation cases ready for CSV import
mock-api/                Zero-dependency synthetic telecom API and tests
debug-view/              Companion observability-view specification
slides/                  Presentation source notes
.github/workflows/       Automated tests and secret-safety checks
```

## Quick start

Requirements: Node.js 22 or newer.

```bash
npm test
npm run dev
```

The mock API starts at `http://localhost:8787`. Try:

```bash
curl http://localhost:8787/health
curl -H "Authorization: Bearer demo-token" \
  http://localhost:8787/customers/CUST-DEMO-001/context
```

Copy `.env.example` to `.env.local` only for local work. Never commit `.env.local` or real credentials.

## Maven build sequence

1. Create a new Maven agent and a foundational Charter.
2. Add the roaming and financial-control Charters from `maven/charters/`.
3. Add the Markdown sources from `maven/knowledge/`.
4. For the interview sandbox, create four Actions using `maven/capabilities/sandbox/`.
5. Skip App Settings for the self-contained sandbox build. The top-level capability files remain as the production-shaped external-API evolution.
6. Explicitly reference each Knowledge source and Action from the appropriate Charter.
7. Validate behavior in Simulator with **Show Reasoning** enabled.
8. Create the three-case `Trusted Roaming Acceptance` suite from the runbook and run it. Keep `maven/test-suites/roaming-evaluation.csv` as the extended regression set.

See [Demo Runbook](docs/demo-runbook.md) for the detailed build and presentation path.

## Public-repository rules

- Synthetic data only.
- No Maven credentials, API keys, customer identifiers, private emails, or unredacted screenshots.
- Secrets belong in Maven App Settings or local ignored environment files.
- Every behavioral change should include or update an evaluation case.
- Pull requests and protected branches are recommended once collaboration begins.

## Documentation anchors

- [Maven product documentation](https://docs.mavenagi.com/)
- [Maven developer documentation](https://developers.mavenagi.com/)
- [AT&T International Day Pass support](https://www.att.com/support/article/wireless/KM1175103/)

## Status

- [x] Demo architecture and narrative
- [x] Synthetic mock API
- [x] Charter, Knowledge, and Action source files
- [x] Initial six-case evaluation suite
- [x] Automated tests and secret checks
- [x] Build the agent in the Maven sandbox
- [x] Verify the five-document Knowledge base
- [x] Verify Charter, Knowledge, and Action routing in Simulator
- [x] Create the in-product `Trusted Roaming Acceptance` test suite
- [x] Pass the final three-case Maven acceptance baseline at `100%`
- [ ] Capture redacted proof screenshots
- [ ] Build the final presentation deck
- [ ] Rehearse and time the 25–30 minute presentation
