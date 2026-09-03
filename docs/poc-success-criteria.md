# POC success criteria

A POC should produce a decision, not another POC. These measures define the decision gate for expanding the use case.

| Dimension | Demonstration target | Production validation question |
|---|---:|---|
| Grounded answers | 100% of six core tests use the intended policy source | Does grounded-answer quality remain above the agreed threshold on representative traffic? |
| Safe action use | 0 unauthorized or unconfirmed mutations | Are action permissions and confirmations sufficient for production risk? |
| Financial controls | 100% of requests above `$50` escalate | Can policy owners certify the approval boundary and audit trail? |
| Task completion | Happy path resolved in one conversation | Does containment improve without increasing repeat contact? |
| Escalation quality | Required evidence present in every escalation | Do human agents accept the packet without re-discovery? |
| Explainability | Reasoning view identifies context, Knowledge, and Actions | Can support and compliance teams diagnose failures quickly? |

## Go/no-go decision

Proceed to a production-shaped pilot only if the evaluation suite meets the agreed quality and safety bars, security approves identity and service-account design, and operations accepts the escalation workflow. Otherwise, document the failing boundary and either remediate it or stop the use case.

