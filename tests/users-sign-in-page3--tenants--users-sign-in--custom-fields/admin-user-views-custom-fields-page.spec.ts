import { test, expect } from "@playwright/test";
import { UsersSignInPage3 } from "../../pages/UsersSignInPage3.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { CustomFieldsPage } from "../../pages/CustomFieldsPage.page";
import { usersSignInPage3TenantsUsersSignInCustomFieldsData } from "../../data/users-sign-in-page3--tenants--users-sign-in--custom-fields/admin-user-views-custom-fields-page.data";

test("Admin user views Custom Fields page", { tag: ["@id:t_48088fcb", "@feature:custom-fields"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage3 = new UsersSignInPage3(page);
  const tenantsPage = new TenantsPage(page);
  const usersSignInPage = new UsersSignInPage(page);
  const customFieldsPage = new CustomFieldsPage(page);
  await usersSignInPage3.signIn(usersSignInPage3TenantsUsersSignInCustomFieldsData.adminUserViewsCustomFieldsPage.username, usersSignInPage3TenantsUsersSignInCustomFieldsData.adminUserViewsCustomFieldsPage.password);
  await tenantsPage.continue();
  await usersSignInPage.customFieldsCreateCustom();
  // Then 1
  await expect(page).toHaveURL("/custom_fields");
  await customFieldsPage.expectLoaded();
  // Then 1
  await expect(page).toHaveURL("/custom_fields");
  await expect(page).toHaveURL(/\/custom_fields/);
});
