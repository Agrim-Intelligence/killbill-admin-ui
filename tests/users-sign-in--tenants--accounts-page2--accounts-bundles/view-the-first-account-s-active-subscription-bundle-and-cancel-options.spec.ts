import { test, expect } from "@playwright/test";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { AccountsPage2 } from "../../pages/AccountsPage2.page";
import { AccountsBundlesPage } from "../../pages/AccountsBundlesPage.page";
import { usersSignInTenantsAccountsPage2AccountsBundlesData } from "../../data/users-sign-in--tenants--accounts-page2--accounts-bundles.data";

test("View the first account's active subscription bundle and cancel options", { tag: ["@id:t_a9476bc9", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage = new UsersSignInPage(page);
  const tenantsPage = new TenantsPage(page);
  const accountsPage2 = new AccountsPage2(page);
  const accountsBundlesPage = new AccountsBundlesPage(page);
  await usersSignInPage.signIn(usersSignInTenantsAccountsPage2AccountsBundlesData.viewTheFirstAccountSActiveSubscriptionBundleAndCancelOptions.username, usersSignInTenantsAccountsPage2AccountsBundlesData.viewTheFirstAccountSActiveSubscriptionBundleAndCancelOptions.password);
  await tenantsPage.save();
  await accountsPage2.subscriptions();
  await expect(page).toHaveURL(/\/bundles/);
  await accountsBundlesPage.expectLoaded();
});
