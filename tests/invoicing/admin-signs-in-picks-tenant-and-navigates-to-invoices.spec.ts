import { test, expect } from "@playwright/test";
import { UsersSignInPage3 } from "../../pages/UsersSignInPage3.page";
import { TenantsPage } from "../../pages/TenantsPage.page";
import { InvoicesPage } from "../../pages/InvoicesPage.page";
import { adminUserSignsInData } from "../../data/admin-user-signs-in/admin-signs-in-picks-tenant-and-navigates-to-invoices.data";

test("Admin signs in, picks tenant, and navigates to invoices", { tag: ["@id:t_d32d9c4a", "@feature:invoicing"], annotation: [{ type: "issue", description: "unlinked" }, { type: "side-effects", description: "none" }] }, async ({ page }) => {
  await page.goto("/users/sign_in");
  const usersSignInPage3 = new UsersSignInPage3(page);
  const tenantsPage = new TenantsPage(page);
  const invoicesPage = new InvoicesPage(page);
  await usersSignInPage3.usersSignInPage3(adminUserSignsInData.adminSignsInPicksTenantAndNavigatesToInvoices.username, adminUserSignsInData.adminSignsInPicksTenantAndNavigatesToInvoices.adminPassword);
  await tenantsPage.continue();
  await page.goto("/invoices");
  // Then 1
  await expect(page).toHaveURL("/invoices");
  await invoicesPage.expectLoaded();
});
