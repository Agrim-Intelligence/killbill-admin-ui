import { test, expect } from "@playwright/test";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { HomePage } from "../../pages/HomePage.page";
import { usersSignInTenantsHomeData } from "../../data/users-sign-in--tenants--home.data";

test("Successfully sign out after selecting a tenant", { tag: ["@id:t_b2c689cf", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage = new UsersSignInPage(page);
  const tenantsPage = new TenantsPage(page);
  const homePage = new HomePage(page);
  await usersSignInPage.signIn(usersSignInTenantsHomeData.successfullySignOutAfterSelectingATenant.username, usersSignInTenantsHomeData.successfullySignOutAfterSelectingATenant.password);
  await tenantsPage.save(usersSignInTenantsHomeData.successfullySignOutAfterSelectingATenant.kbTenantId);
  await homePage.logout();
  await expect(page).toHaveURL("/users/sign_in");
  await usersSignInPage.expectLoaded();
  await expect(page).toHaveURL(/\/users\/sign_in/);
});
