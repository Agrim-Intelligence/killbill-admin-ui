# Omega demo kit for this fork of Kaui (Kill Bill admin UI)

This fork plays a **real SaaS vendor's product repository**: the vendor ships Kaui, has several clients
(each a Kill Bill tenant) and deployments, and introduces Omega to generate, run and sign off tests per
client and per release. The tests will live in **this repository** (`tests_live_in: product-repo`,
product branch `master`); Omega opens pull requests into it.

| Piece | Where |
|---|---|
| Registry of lines, deployments, clients and links | `omega.registry.yaml` (operator-owned) |
| Fleet feature list | `features.yaml` (starts empty; Omega proposes features) |
| Seeds for the three client tenants, deployment of both Kaui sites | `Agrim-Intelligence/killbill-target` (`seed/clients.json`, `seed/clients.py`, Railway services) |
| Product source | this repository; release tags `v4.0.x` |

## The two deployments and three clients

| Deployment | Base URL | Kaui |
|---|---|---|
| `staging` | https://kaui-production-8bf2.up.railway.app | 4.0.31 |
| `uat` | https://kaui-uat-production.up.railway.app | 4.0.31 |

Both talk to one Kill Bill (0.24.22). A client is a tenant, picked after sign-in. Sign-in is `admin`; the
password lives in the Railway variable `KB_ADMIN_PASSWORD` and is handed to Omega as a credential set,
never written in this repo.

| Client | Tenant | Accounts | Features that make it different |
|---|---|---|---|
| `client-a` Acme | Acme Test Tenant | 5 (Acme Test 001-005) | annual plan and a pro plan |
| `client-b` Globex | Globex Test Tenant | 4 (Globex Test 001-004) | annual plan, no pro plan |
| `client-c` Initech | Initech Test Tenant | 3 (Initech Test 001-003) | trial only: monthly plan only, account 003 has no subscription |

## The five scenarios (from the team call of 3 Nov)

1. **Client onboarding.** `omega.registry.yaml` is the sample file: three clients with a link on each deployment.
2. **Environments.** Every client is tagged with both deployments; clients share a deployment.
3. **Feature variables.** `features` on each link say which plans exist for the client.
4. **Test generation.** Describe a scenario in `scenarios/` in plain words, watch Omega generate it end to end.
5. **Execution across clients and environments.** Run the generated suite on every link: journeys that need
   the pro plan pass for Acme and are skipped or fail for Globex and Initech, which is the pass/fail story.

`scenarios/` holds the plain-language descriptions Omega is asked to turn into Playwright tests. They are
requirements, not tests: tests, page objects and data are written by Omega only (ADR-004).
