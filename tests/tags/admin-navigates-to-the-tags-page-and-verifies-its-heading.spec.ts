import { test, expect } from "@playwright/test";
import { UsersSignInPage3 } from "../../pages/UsersSignInPage3.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { TagsPage } from "../../pages/TagsPage.page";
import { adminManagesTagsData } from "../../data/admin-manages-tags/admin-navigates-to-the-tags-page-and-verifies-its-heading.data";

test("Admin navigates to the Tags page and verifies its heading", { tag: ["@id:t_daa45cd0", "@feature:tags"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage3 = new UsersSignInPage3(page);
  const tenantsPage = new TenantsPage(page);
  const usersSignInPage = new UsersSignInPage(page);
  const tagsPage = new TagsPage(page);
  await usersSignInPage3.signIn(adminManagesTagsData.adminNavigatesToTheTagsPageAndVerifiesItsHeading.username, adminManagesTagsData.adminNavigatesToTheTagsPageAndVerifiesItsHeading.password);
  await tenantsPage.continue();
  await usersSignInPage.tagsApplyOneOrMoreTags();
  await tagsPage.expectLoaded();
  // Then 1
  await expect(page).toHaveURL("/tags");
  await tagsPage.expectLoaded2();
  await expect(page).toHaveURL(/\/tags$/);
});
