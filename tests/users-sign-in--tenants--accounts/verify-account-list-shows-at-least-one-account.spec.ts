import { test, expect } from "@playwright/test";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { AccountsPage } from "../../pages/AccountsPage.page";
import { usersSignInTenantsAccountsData } from "../../data/users-sign-in--tenants--accounts/verify-account-list-shows-at-least-one-account.data";

test("Verify account list shows at least one account", { tag: ["@id:t_baeed454", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage = new UsersSignInPage(page);
  const tenantsPage = new TenantsPage(page);
  const accountsPage = new AccountsPage(page);
  await usersSignInPage.signIn(usersSignInTenantsAccountsData.verifyAccountListShowsAtLeastOneAccount.username, usersSignInTenantsAccountsData.verifyAccountListShowsAtLeastOneAccount.password);
  await tenantsPage.save(usersSignInTenantsAccountsData.verifyAccountListShowsAtLeastOneAccount.kbTenantId);
  // Then 1
  await expect(page).toHaveURL("/accounts");
  // Then 1
  await accountsPage.expectLoaded();
  // Then 1
  await expect(page).toHaveURL('/accounts');
});
