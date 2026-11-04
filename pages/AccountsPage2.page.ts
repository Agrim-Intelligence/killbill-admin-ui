// Generated from pages/AccountsPage2.selectors.json. Do not edit by hand:
// change the selectors JSON and regenerate, so the fix is one reviewable line.
import { Page, Locator, test } from '@playwright/test';

export class AccountsPage2 {
  static readonly route = '/accounts/{record}';

  /** The control labelled "Subscriptions" on the page */
  private readonly subscriptionsLink: Locator;

  constructor(private readonly page: Page) {
    this.subscriptionsLink = page.getByRole('link', { name: 'Subscriptions' });
  }

  async subscriptions(): Promise<void> {
    await test.step('subscriptions()', async () => {
      await this.subscriptionsLink.click();
    }, { box: true });
  }
}
