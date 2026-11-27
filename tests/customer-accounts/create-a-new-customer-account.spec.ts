import { test, expect } from "@playwright/test";
import { UsersSignInPage3 } from "../../pages/UsersSignInPage3.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { AccountsNewPage2 } from "../../pages/AccountsNewPage2.page";
import { kauiCustomerAccountCreationData } from "../../data/kaui-customer-account-creation/create-a-new-customer-account.data";

test("Create a new customer account", { tag: ["@id:t_11d9ddb0", "@feature:customer-accounts"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/");
  const usersSignInPage3 = new UsersSignInPage3(page);
  const tenantsPage = new TenantsPage(page);
  const usersSignInPage = new UsersSignInPage(page);
  const accountsNewPage2 = new AccountsNewPage2(page);
  await usersSignInPage3.signIn(kauiCustomerAccountCreationData.createANewCustomerAccount.username, kauiCustomerAccountCreationData.createANewCustomerAccount.password);
  await tenantsPage.continue();
  await usersSignInPage.accountsViewAll();
  await accountsNewPage2.saveAccount(kauiCustomerAccountCreationData.createANewCustomerAccount.userName, kauiCustomerAccountCreationData.createANewCustomerAccount.email);
  // Then 1
  await expect(page).toHaveURL(/\/accounts\//);
  // Then 2
  await expect(page).toHaveURL(/\/accounts\//);
  // Then 2
  await expect(page).toHaveURL(/\/accounts\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
});
