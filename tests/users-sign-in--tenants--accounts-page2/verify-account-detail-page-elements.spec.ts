import { test, expect } from "@playwright/test";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { AccountsPage2 } from "../../pages/AccountsPage2.page";
import { usersSignInTenantsAccountsPage2Data } from "../../data/users-sign-in--tenants--accounts-page2.data";

test("Verify account detail page elements", { tag: ["@id:t_738f894e", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage = new UsersSignInPage(page);
  const tenantsPage = new TenantsPage(page);
  const accountsPage2 = new AccountsPage2(page);
  await usersSignInPage.signIn(usersSignInTenantsAccountsPage2Data.verifyAccountDetailPageElements.username, usersSignInTenantsAccountsPage2Data.verifyAccountDetailPageElements.password);
  await tenantsPage.save(usersSignInTenantsAccountsPage2Data.verifyAccountDetailPageElements.kbTenantId);
  await accountsPage2.expectLoaded();
  await expect(page).toHaveURL(/\/accounts\//);
});
