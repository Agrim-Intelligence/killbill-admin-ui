import { test, expect } from "@playwright/test";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { HomePage } from "../../pages/HomePage.page";
import { usersSignInTenantsHomeData } from "../../data/users-sign-in--tenants--home.data";

test("Successful Admin Sign-in", { tag: ["@id:t_024643fe", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage = new UsersSignInPage(page);
  const tenantsPage = new TenantsPage(page);
  const homePage = new HomePage(page);
  await usersSignInPage.signIn(usersSignInTenantsHomeData.successfulAdminSignIn.username, usersSignInTenantsHomeData.successfulAdminSignIn.password);
  await tenantsPage.save();
  await expect(page).toHaveURL("/home");
  await expect(page).toHaveURL("/home");
  await homePage.expectLoaded();
  await expect(page).toHaveURL(/\/home/);
});
