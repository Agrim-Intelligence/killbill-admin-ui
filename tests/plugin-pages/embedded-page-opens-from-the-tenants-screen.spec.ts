import { test, expect } from "@playwright/test";
import { UsersSignInPage3 } from "../../pages/UsersSignInPage3.page";
import { tenantManagementPageNavigationData } from "../../data/tenant-management-page-navigation/embedded-page-opens-from-the-tenants-screen.data";

test("Embedded page opens from the tenants screen", { tag: ["@id:t_4e696d3e", "@feature:plugin-pages"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/");
  const usersSignInPage3 = new UsersSignInPage3(page);
  await usersSignInPage3.usersSignInPage3(tenantManagementPageNavigationData.embeddedPageOpensFromTheTenantsScreen.username, tenantManagementPageNavigationData.embeddedPageOpensFromTheTenantsScreen.adminPassword);
  await expect(page).toHaveURL("/tenants");
});
