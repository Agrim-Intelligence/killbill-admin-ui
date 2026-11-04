import { test, expect } from "@playwright/test";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { AccountsPage2 } from "../../pages/AccountsPage2.page";
import { usersSignInTenantsAccountsPage2Data } from "../../data/users-sign-in--tenants--accounts-page2.data";

test("Select tenant, open accounts, and view first account details", { tag: ["@id:t_66737e70", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage = new UsersSignInPage(page);
  const tenantsPage = new TenantsPage(page);
  const accountsPage2 = new AccountsPage2(page);
  await usersSignInPage.signIn(usersSignInTenantsAccountsPage2Data.selectTenantOpenAccountsAndViewFirstAccountDetails.username, usersSignInTenantsAccountsPage2Data.selectTenantOpenAccountsAndViewFirstAccountDetails.password);
  await tenantsPage.save(usersSignInTenantsAccountsPage2Data.selectTenantOpenAccountsAndViewFirstAccountDetails.kbTenantId);
  await expect(page).toHaveURL("/home");
  await accountsPage2.expectLoaded();
  await expect(page).toHaveURL(/\/accounts\//);
});
