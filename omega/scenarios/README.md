# Scenarios to give Omega (plain words)

One file per scenario. Paste the text into Omega's new-run box with the target set to a deployment above.
Pick the client by tenant name after sign-in. Everything is synthetic data.

| # | File | Applies to | What it checks |
|---|---|---|---|
| 1 | `01-sign-in.md` | all clients | Admin signs in and reaches the home page |
| 2 | `02-accounts-list.md` | all clients | The accounts table loads and shows the client's accounts |
| 3 | `03-account-search.md` | all clients | Searching by name finds one account |
| 4 | `04-account-detail.md` | all clients | An account page shows its id, key and sub-pages |
| 5 | `05-subscriptions.md` | all clients | An account's subscription bundle is listed |
| 6 | `06-create-subscription-pro.md` | **Acme only** | The pro plan can be chosen when creating a subscription (fails elsewhere) |
| 7 | `07-annual-plan-offered.md` | Acme and Globex | The annual plan is offered (fails for Initech) |
| 8 | `08-invoices.md` | all clients | An account's invoices page opens |
| 9 | `09-sign-out.md` | all clients | Admin signs out and is sent back to sign-in |
| 10 | `10-live-generation-demo.md` | demo | Generated live in front of an audience: add a note to an account |
