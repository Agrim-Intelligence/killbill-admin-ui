import { test, expect } from "@playwright/test";
import { UsersSignInPage } from "../../pages/UsersSignInPage.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { AccountsPage2 } from "../../pages/AccountsPage2.page";
import { AccountsInvoicesPage } from "../../pages/AccountsInvoicesPage.page";
import { usersSignInTenantsAccountsPage2AccountsInvoicesData } from "../../data/users-sign-in--tenants--accounts-page2--accounts-invoices.data";

test("Navigate to Invoices page and verify content", { tag: ["@id:t_a7f67bb7", "@feature:core"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage = new UsersSignInPage(page);
  const tenantsPage = new TenantsPage(page);
  const accountsPage2 = new AccountsPage2(page);
  const accountsInvoicesPage = new AccountsInvoicesPage(page);
  await usersSignInPage.signIn(usersSignInTenantsAccountsPage2AccountsInvoicesData.navigateToInvoicesPageAndVerifyContent.username, usersSignInTenantsAccountsPage2AccountsInvoicesData.navigateToInvoicesPageAndVerifyContent.password);
  await tenantsPage.save(usersSignInTenantsAccountsPage2AccountsInvoicesData.navigateToInvoicesPageAndVerifyContent.kbTenantId);
  await accountsPage2.invoices();
  await expect(page).toHaveURL(/\/invoices/);
  await expect(page).toHaveURL(/\/invoices/);
  await accountsInvoicesPage.expectLoaded();
});
