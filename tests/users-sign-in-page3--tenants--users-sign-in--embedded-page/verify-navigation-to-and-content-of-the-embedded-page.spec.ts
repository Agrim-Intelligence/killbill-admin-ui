import { test, expect } from "@playwright/test";
import { UsersSignInPage3 } from "../../pages/UsersSignInPage3.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { EmbeddedPagePage } from "../../pages/EmbeddedPagePage.page";
import { usersSignInPage3TenantsUsersSignInEmbeddedPageData } from "../../data/users-sign-in-page3--tenants--users-sign-in--embedded-page/verify-navigation-to-and-content-of-the-embedded-page.data";

test("Verify navigation to and content of the embedded page", { tag: ["@id:t_4e696d3e", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/");
  const usersSignInPage3 = new UsersSignInPage3(page);
  const tenantsPage = new TenantsPage(page);
  const usersSignInPage = new UsersSignInPage(page);
  const embeddedPagePage = new EmbeddedPagePage(page);
  await usersSignInPage3.signIn(usersSignInPage3TenantsUsersSignInEmbeddedPageData.verifyNavigationToAndContentOfTheEmbeddedPage.username, usersSignInPage3TenantsUsersSignInEmbeddedPageData.verifyNavigationToAndContentOfTheEmbeddedPage.password);
  await tenantsPage.continue();
  await usersSignInPage.embeddedPage();
  await embeddedPagePage.expectLoaded();
  await expect(page).toHaveURL(/\/embedded-page/);
});
