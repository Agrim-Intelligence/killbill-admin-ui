import { test, expect } from "@playwright/test";
import { UsersSignInPage3 } from "../../pages/UsersSignInPage3.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { AccountsPage } from "../../pages/AccountsPage.page";
import { usersSignInPage3TenantsUsersSignInAccountsData } from "../../data/users-sign-in-page3--tenants--users-sign-in--accounts/admin-signs-in-and-views-accounts-list.data";

test("Admin signs in and views accounts list", { tag: ["@id:t_c1ac61b2", "@feature:accounts"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage3 = new UsersSignInPage3(page);
  const tenantsPage = new TenantsPage(page);
  const usersSignInPage = new UsersSignInPage(page);
  const accountsPage = new AccountsPage(page);
  await usersSignInPage3.signIn(usersSignInPage3TenantsUsersSignInAccountsData.adminSignsInAndViewsAccountsList.username, usersSignInPage3TenantsUsersSignInAccountsData.adminSignsInAndViewsAccountsList.password);
  await tenantsPage.continue();
  await usersSignInPage.accountsViewAll();
  await accountsPage.expectLoaded();
  // Then 2
  await accountsPage.expectLoaded2();
  await expect(page).toHaveURL(/\/accounts/);
});
