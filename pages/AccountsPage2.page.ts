// Generated from pages/AccountsPage2.selectors.json. Do not edit by hand:
// change the selectors JSON and regenerate, so the fix is one reviewable line.
import { Page, Locator, expect, test } from '@playwright/test';

export class AccountsPage2 {
  static readonly route = '/accounts/{record}';

  /** The control labelled "Subscriptions" on the page */
  private readonly subscriptionsLink: Locator;
  /** The control labelled "Breadcrumb" on the page */
  private readonly breadcrumbNavigation: Locator;
  /** The control labelled "Invoices" on the page */
  private readonly invoicesLink: Locator;
  /** The control labelled "Payments" on the page */
  private readonly paymentsLink: Locator;
  /** The control labelled "Account Information" on the page */
  private readonly accountInformationHeading: Locator;

  constructor(private readonly page: Page) {
    this.subscriptionsLink = page.getByRole('link', { name: 'Subscriptions' });
    this.breadcrumbNavigation = page.getByRole('navigation', { name: 'Breadcrumb' });
    this.invoicesLink = page.getByRole('link', { name: 'Invoices' });
    this.paymentsLink = page.getByRole('link', { name: 'Payments' });
    this.accountInformationHeading = page.getByRole('heading', { name: 'Account Information' });
  }

  async expectLoaded(): Promise<void> {
    await test.step('expectLoaded()', async () => {
      await expect(this.accountInformationHeading).toBeVisible();
      await expect(this.subscriptionsLink).toBeVisible();
      await expect(this.paymentsLink).toBeVisible();
      await expect(this.invoicesLink).toBeVisible();
    }, { box: true });
  }
}
