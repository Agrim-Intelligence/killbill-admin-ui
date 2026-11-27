import { test, expect } from "@playwright/test";
import { UsersSignInPage3 } from "../../pages/UsersSignInPage3.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { AccountsNewPage2 } from "../../pages/AccountsNewPage2.page";
import { AccountsPage3 } from "../../pages/AccountsPage3.page";
import { AccountsPage } from "../../pages/AccountsPage.page";
import { usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data } from "../../data/users-sign-in-page3--tenants--users-sign-in--accounts-new-page2--accoun-8be26536/create-a-new-customer-account.data";
import { handOffId } from "../../data/users-sign-in-page3--tenants--users-sign-in--accounts-new-page2--accoun-8be26536/create-a-new-customer-account.data";

test("Create a new customer account", { tag: ["@id:t_a0608007", "@feature:core", "@setup"], annotation: [{ type: "issue", description: "unlinked" }, { type: "kind", description: "setup" }, { type: "produces", description: "account" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/");
  const usersSignInPage3 = new UsersSignInPage3(page);
  const tenantsPage = new TenantsPage(page);
  const usersSignInPage = new UsersSignInPage(page);
  const accountsNewPage2 = new AccountsNewPage2(page);
  const accountsPage3 = new AccountsPage3(page);
  const accountsPage = new AccountsPage(page);
  await usersSignInPage3.signIn(usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createANewCustomerAccount.username, usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createANewCustomerAccount.password);
  await tenantsPage.continue();
  await usersSignInPage.createAccount();
  await accountsNewPage2.saveAccount(usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createANewCustomerAccount.userName, usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createANewCustomerAccount.email);
  // Then 1
  await expect(page).toHaveURL(/\/accounts\//);
  // Then 2
  await expect(page).toHaveURL(/\/accounts\//);
  await accountsPage3.expectLoaded(usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createANewCustomerAccount.userName);
  await page.goto("/accounts");
  await accountsPage.accounts(usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createANewCustomerAccount.userName);
  // Then 4
  await expect(page).toHaveURL(/\/accounts\//);
  await accountsPage3.expectLoaded2(usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createANewCustomerAccount.userName);
  // Then 4
  await expect(page).toHaveURL(/\/accounts\//);
  // Then 4
  await accountsPage3.expectLoaded3(usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data.createANewCustomerAccount.userName);
  await accountsPage3.expectLoaded4();
  // Then 4
  await expect(page).toHaveURL(/\/accounts\/[0-9a-f-]+/);
  await handOffId("account", page, "/accounts/{record}");
});
