import { test, expect } from "@playwright/test";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { AccountsPage } from "../../pages/AccountsPage.page";
import { usersSignInTenantsAccountsData } from "../../data/users-sign-in--tenants--accounts.data";

test("Select \"Acme Test Tenant\" and navigate to Accounts", { tag: ["@id:t_88d57578", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage = new UsersSignInPage(page);
  const tenantsPage = new TenantsPage(page);
  const accountsPage = new AccountsPage(page);
  await usersSignInPage.signIn(usersSignInTenantsAccountsData.selectAcmeTestTenantAndNavigateToAccounts.username, usersSignInTenantsAccountsData.selectAcmeTestTenantAndNavigateToAccounts.password);
  await tenantsPage.save(usersSignInTenantsAccountsData.selectAcmeTestTenantAndNavigateToAccounts.kbTenantId);
  await expect(page).toHaveURL(/\/accounts/);
  await accountsPage.expectLoaded();
  await expect(page).toHaveURL(/\/accounts/);
});
