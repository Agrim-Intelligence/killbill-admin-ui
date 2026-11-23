import { test, expect } from "@playwright/test";
import { UsersSignInPage2 } from "../../pages/UsersSignInPage2.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { EmbeddedPagePage } from "../../pages/EmbeddedPagePage.page";
import { usersSignInPage2TenantsUsersSignInEmbeddedPageData } from "../../data/users-sign-in-page2--tenants--users-sign-in--embedded-page/verify-embedded-page-content-and-link.data";

test("Verify embedded page content and link", { tag: ["@id:t_b5c36967", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/");
  const usersSignInPage2 = new UsersSignInPage2(page);
  const tenantsPage = new TenantsPage(page);
  const usersSignInPage = new UsersSignInPage(page);
  const embeddedPagePage = new EmbeddedPagePage(page);
  await usersSignInPage2.signIn(usersSignInPage2TenantsUsersSignInEmbeddedPageData.verifyEmbeddedPageContentAndLink.username, usersSignInPage2TenantsUsersSignInEmbeddedPageData.verifyEmbeddedPageContentAndLink.password);
  await tenantsPage.continue();
  await usersSignInPage.embeddedPage();
  await embeddedPagePage.expectLoaded();
  await expect(page).toHaveURL(/\/embedded-page/);
});
