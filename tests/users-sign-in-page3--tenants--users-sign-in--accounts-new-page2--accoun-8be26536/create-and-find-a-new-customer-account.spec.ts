import { test, expect } from "@playwright/test";
import { UsersSignInPage3 } from "../../pages/UsersSignInPage3.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { AccountsNewPage2 } from "../../pages/AccountsNewPage2.page";
import { AccountsPage3 } from "../../pages/AccountsPage3.page";
import { AccountsPage } from "../../pages/AccountsPage.page";
import { usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data } from "../../data/users-sign-in-page3--tenants--users-sign-in--accounts-new-page2--accoun-8be26536/create-and-find-a-new-customer-account.data";

test("Create and find a new customer account", { tag: ["@id:t_239f98dc", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/");
  const usersSignInPage3 = new UsersSignInPage3(page);
  const tenantsPage = new TenantsPage(page);
  const usersSignInPage = new UsersSignInPage(page);
  const accountsNewPage2 = new AccountsNewPage2(page);
  const accountsPage3 = new AccountsPage3(page);
  const accountsPage = new AccountsPage(page);
  await usersSignInPage3.signIn(usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createAndFindANewCustomerAccount.username, usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createAndFindANewCustomerAccount.password);
  await tenantsPage.continue();
  await usersSignInPage.createAccount();
  await accountsNewPage2.saveAccount(usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createAndFindANewCustomerAccount.userName, usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createAndFindANewCustomerAccount.email, usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createAndFindANewCustomerAccount.currency);
  await accountsPage3.expectLoaded(usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createAndFindANewCustomerAccount.userName);
  await accountsPage.accounts(usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createAndFindANewCustomerAccount.userName);
  // Then 2
  await expect(page).toHaveURL(/\/accounts\//);
  await accountsPage3.expectLoaded2(usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createAndFindANewCustomerAccount.userName);
  // Then 2
  await expect(page).toHaveURL(/\/accounts\//);
  await accountsPage3.expectLoaded3(usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createAndFindANewCustomerAccount.userName);
});
