import { test, expect } from "@playwright/test";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";

test("Verify login page loads with message for unauthenticated user and snackbar closes", { tag: ["@id:t_a5a76f03", "@feature:user-authentication"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/home");
  const usersSignInPage = new UsersSignInPage(page);
  // Then 1
  await expect(page).toHaveURL("/users/sign_in");
  await usersSignInPage.expectLoaded();
  // Then 1
  await expect(page).toHaveURL("/users/sign_in");
  await usersSignInPage.close();
  // Then 3
  await usersSignInPage.expectLoaded2();
  // Then 4
  await expect(page).toHaveURL("/users/sign_in");
});
