import { test, expect } from "@playwright/test";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { AccountsPage2 } from "../../pages/AccountsPage2.page";
import { AccountsBundlesPage } from "../../pages/AccountsBundlesPage.page";
import { SubscriptionsNewPage } from "../../pages/SubscriptionsNewPage.page";
import { usersSignInTenantsAccountsPage2AccountsBundlesSubscriptionsNewData } from "../../data/users-sign-in--tenants--accounts-page2--accounts-bundles--subscriptions-new.data";

test("Start a new pro monthly subscription for Acme account", { tag: ["@id:t_dfda0f89", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage = new UsersSignInPage(page);
  const tenantsPage = new TenantsPage(page);
  const accountsPage2 = new AccountsPage2(page);
  const accountsBundlesPage = new AccountsBundlesPage(page);
  const subscriptionsNewPage = new SubscriptionsNewPage(page);
  await usersSignInPage.signIn(usersSignInTenantsAccountsPage2AccountsBundlesSubscriptionsNewData.startANewProMonthlySubscriptionForAcmeAccount.username, usersSignInTenantsAccountsPage2AccountsBundlesSubscriptionsNewData.startANewProMonthlySubscriptionForAcmeAccount.password);
  await expect(page).toHaveURL("/tenants");
  await tenantsPage.killBillLogo();
  await expect(page).toHaveURL("/tenants");
  await tenantsPage.save(usersSignInTenantsAccountsPage2AccountsBundlesSubscriptionsNewData.startANewProMonthlySubscriptionForAcmeAccount.kbTenantId);
  await accountsPage2.subscriptions();
  await accountsBundlesPage.createSubscription();
  await subscriptionsNewPage.expectLoaded();
  await expect(page).toHaveURL(/\/subscriptions\/new/);
  await subscriptionsNewPage.expectLoaded2();
});
