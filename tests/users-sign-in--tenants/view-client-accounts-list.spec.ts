import { test, expect } from "@playwright/test";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { usersSignInTenantsData } from "../../data/users-sign-in--tenants.data";

test("View client accounts list", { tag: ["@id:t_aa5cbdc9", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage = new UsersSignInPage(page);
  const tenantsPage = new TenantsPage(page);
  await usersSignInPage.signIn(usersSignInTenantsData.viewClientAccountsList.username, usersSignInTenantsData.viewClientAccountsList.password);
  await tenantsPage.save();
  await expect(page).toHaveURL("/home");
  await expect(page).toHaveURL("/accounts");
  await expect(page).toHaveURL("/accounts");
  await expect(page).toHaveURL(/\/accounts/);
});
