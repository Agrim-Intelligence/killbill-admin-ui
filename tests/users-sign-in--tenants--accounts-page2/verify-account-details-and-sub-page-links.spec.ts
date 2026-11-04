import { test, expect } from "@playwright/test";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { AccountsPage2 } from "../../pages/AccountsPage2.page";
import { usersSignInTenantsAccountsPage2Data } from "../../data/users-sign-in--tenants--accounts-page2.data";

test("Verify account details and sub-page links", { tag: ["@id:t_8d798714", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage = new UsersSignInPage(page);
  const tenantsPage = new TenantsPage(page);
  const accountsPage2 = new AccountsPage2(page);
  await usersSignInPage.signIn(usersSignInTenantsAccountsPage2Data.verifyAccountDetailsAndSubPageLinks.username, usersSignInTenantsAccountsPage2Data.verifyAccountDetailsAndSubPageLinks.password);
  await tenantsPage.save();
  await expect(page).toHaveURL("/home");
  await accountsPage2.expectLoaded();
  await expect(page).toHaveURL(/\/accounts\//);
  await expect(page).toHaveURL(/\/accounts\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
});
