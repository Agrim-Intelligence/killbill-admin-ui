// Generated from pages/AccountsInvoicesPage.selectors.json. Do not edit by hand:
// change the selectors JSON and regenerate, so the fix is one reviewable line.
import { Page, Locator, expect, test } from '@playwright/test';

export class AccountsInvoicesPage {
  static readonly route = '/accounts/{record}/invoices';

  /** The control labelled "Breadcrumb" on the page */
  private readonly breadcrumbNavigation: Locator;
  /** The control labelled "Invoices" on the page */
  private readonly invoicesHeading: Locator;

  constructor(private readonly page: Page) {
    this.breadcrumbNavigation = page.getByRole('navigation', { name: 'Breadcrumb' });
    this.invoicesHeading = page.getByRole('heading', { name: 'Invoices' });
  }

  async expectLoaded(): Promise<void> {
    await test.step('expectLoaded()', async () => {
      await expect(this.invoicesHeading).toBeVisible();
    }, { box: true });
  }
}
