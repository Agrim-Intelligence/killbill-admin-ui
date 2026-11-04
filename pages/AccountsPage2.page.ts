// Generated from pages/AccountsPage2.selectors.json. Do not edit by hand:
// change the selectors JSON and regenerate, so the fix is one reviewable line.
import { Page, Locator, expect, test } from '@playwright/test';

export class AccountsPage2 {
  static readonly route = '/accounts/{record}';

  /** The control labelled "Subscriptions" on the page */
  private readonly subscriptionsLink: Locator;
  /** The control labelled "Breadcrumb" on the page */
  private readonly breadcrumbNavigation: Locator;

  constructor(private readonly page: Page) {
    this.subscriptionsLink = page.getByRole('link', { name: 'Subscriptions' });
    this.breadcrumbNavigation = page.getByRole('navigation', { name: 'Breadcrumb' });
  }

  async expectLoaded(): Promise<void> {
    await test.step('expectLoaded()', async () => {
      await expect(this.breadcrumbNavigation).toBeVisible();
    }, { box: true });
  }
}
