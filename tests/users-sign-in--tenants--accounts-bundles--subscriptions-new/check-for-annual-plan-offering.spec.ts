import { test, expect } from "@playwright/test";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { AccountsBundlesPage } from "../../pages/AccountsBundlesPage.page";
import { SubscriptionsNewPage } from "../../pages/SubscriptionsNewPage.page";
import { usersSignInTenantsAccountsBundlesSubscriptionsNewData } from "../../data/users-sign-in--tenants--accounts-bundles--subscriptions-new.data";

test("Check for annual plan offering", { tag: ["@id:t_1cdbfa77", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage = new UsersSignInPage(page);
  const tenantsPage = new TenantsPage(page);
  const accountsBundlesPage = new AccountsBundlesPage(page);
  const subscriptionsNewPage = new SubscriptionsNewPage(page);
  await usersSignInPage.signIn(usersSignInTenantsAccountsBundlesSubscriptionsNewData.checkForAnnualPlanOffering.username, usersSignInTenantsAccountsBundlesSubscriptionsNewData.checkForAnnualPlanOffering.password);
  await tenantsPage.save(usersSignInTenantsAccountsBundlesSubscriptionsNewData.checkForAnnualPlanOffering.kbTenantId);
  await expect(page).toHaveURL("/home");
  await accountsBundlesPage.createSubscription();
  await subscriptionsNewPage.expectLoaded();
  await expect(page).toHaveURL(/\/subscriptions\/new/);
});
