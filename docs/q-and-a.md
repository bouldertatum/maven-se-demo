# Panel Q&A preparation

## Why this use case?

It combines fragmented knowledge, authenticated context, operational actions, financial risk, and a natural escalation boundary. That lets the panel evaluate both customer empathy and technical judgment in one coherent story.

## Why Maven rather than a conventional chatbot?

The value is not prose generation. The agent receives the relevant operating instructions for the current situation, grounds the answer in curated Knowledge, uses governed Actions, and exposes evidence that can be evaluated repeatedly.

## Why not automate the credit?

The `$327` request deliberately exceeds the synthetic approval threshold. The demo shows that useful automation includes knowing when to preserve human judgment and handing over a complete evidence packet.

## Why Custom Actions instead of a full Maven App?

Four focused calls are sufficient for the interview proof. Custom Actions reduce deployment overhead while preserving realistic integration boundaries. A Maven App becomes appropriate when packaging, reuse, lifecycle hooks, or a larger capability surface justify it.

## How would this reach production?

Replace the mock API with authenticated enterprise services, define least-privilege service accounts, formalize policy ownership, add observability and rate limits, validate on representative traffic, and use the POC decision gate before expansion.

## What if the model chooses the wrong Action?

Constrain availability through Charter references, use clear Action descriptions and structured inputs, require confirmation for mutations, return typed failure information, and add the failure to the Test Suite so the fix is regression-tested.

