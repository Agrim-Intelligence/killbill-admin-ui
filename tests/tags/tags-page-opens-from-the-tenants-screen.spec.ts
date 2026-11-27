import { test, expect } from "@playwright/test";
import { UsersSignInPage3 } from "../../pages/UsersSignInPage3.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { TagsPage } from "../../pages/TagsPage.page";
import { adminUserVerifiesTagsData } from "../../data/admin-user-verifies-tags/tags-page-opens-from-the-tenants-screen.data";

test("Tags page opens from the tenants screen", { tag: ["@id:t_daa45cd0", "@feature:tags"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/");
  const usersSignInPage3 = new UsersSignInPage3(page);
  const tenantsPage = new TenantsPage(page);
  const tagsPage = new TagsPage(page);
  await usersSignInPage3.usersSignInPage3(adminUserVerifiesTagsData.tagsPageOpensFromTheTenantsScreen.username, adminUserVerifiesTagsData.tagsPageOpensFromTheTenantsScreen.adminPassword);
  await page.goto("/tags");
  await tenantsPage.tenant();
  await page.goto("/tags");
  await tenantsPage.continue();
  await page.goto("/tenants");
  await tagsPage.expectLoaded();
  // Then 1
  await expect(page).toHaveURL("/tags");
  await tagsPage.expectLoaded2();
  // Then 1
  await expect(page).toHaveURL("/tags");
  await tagsPage.expectLoaded3();
  // Then 1
  await expect(page).toHaveURL("/tags");
  await expect(page).toHaveURL(/\/tags$/);
});
