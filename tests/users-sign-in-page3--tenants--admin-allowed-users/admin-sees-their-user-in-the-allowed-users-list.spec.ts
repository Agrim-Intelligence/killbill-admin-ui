import { test, expect } from "@playwright/test";
import { UsersSignInPage3 } from "../../pages/UsersSignInPage3.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { AdminAllowedUsersPage } from "../../pages/AdminAllowedUsersPage.page";
import { usersSignInPage3TenantsAdminAllowedUsersData } from "../../data/users-sign-in-page3--tenants--admin-allowed-users/admin-sees-their-user-in-the-allowed-users-list.data";

test("Admin sees their user in the Allowed Users list", { tag: ["@id:t_f4e0b092", "@feature:admin-allowed-users"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage3 = new UsersSignInPage3(page);
  const tenantsPage = new TenantsPage(page);
  const adminAllowedUsersPage = new AdminAllowedUsersPage(page);
  await usersSignInPage3.signIn(usersSignInPage3TenantsAdminAllowedUsersData.adminSeesTheirUserInTheAllowedUsersList.username, usersSignInPage3TenantsAdminAllowedUsersData.adminSeesTheirUserInTheAllowedUsersList.password);
  await tenantsPage.continue();
  await page.goto("/admin_allowed_users");
  await adminAllowedUsersPage.expectLoaded(usersSignInPage3TenantsAdminAllowedUsersData.adminSeesTheirUserInTheAllowedUsersList.username);
  await expect(page).toHaveURL(/\/admin_allowed_users/);
});
