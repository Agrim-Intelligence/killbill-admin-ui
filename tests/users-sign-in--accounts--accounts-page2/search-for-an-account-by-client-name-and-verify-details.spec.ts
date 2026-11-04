import { test, expect } from "@playwright/test";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { AccountsPage } from "../../pages/AccountsPage.page";
import { AccountsPage2 } from "../../pages/AccountsPage2.page";
import { usersSignInAccountsAccountsPage2Data } from "../../data/users-sign-in--accounts--accounts-page2.data";

test("Search for an account by client name and verify details", { tag: ["@id:t_23f956ee", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage = new UsersSignInPage(page);
  const accountsPage = new AccountsPage(page);
  const accountsPage2 = new AccountsPage2(page);
  await usersSignInPage.signIn(usersSignInAccountsAccountsPage2Data.searchForAnAccountByClientNameAndVerifyDetails.username, usersSignInAccountsAccountsPage2Data.searchForAnAccountByClientNameAndVerifyDetails.password);
  await expect(page).toHaveURL("/accounts");
  await accountsPage.advancedSearch(usersSignInAccountsAccountsPage2Data.searchForAnAccountByClientNameAndVerifyDetails.searchField, usersSignInAccountsAccountsPage2Data.searchForAnAccountByClientNameAndVerifyDetails.searchValue);
  await accountsPage.expectLoaded();
  await accountsPage2.expectLoaded();
  await expect(page).toHaveURL(/\/accounts\/[0-9a-f-]+$/);
});
