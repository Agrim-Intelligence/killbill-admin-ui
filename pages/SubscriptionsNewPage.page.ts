// Generated from pages/SubscriptionsNewPage.selectors.json. Do not edit by hand:
// change the selectors JSON and regenerate, so the fix is one reviewable line.
import { Page, Locator, expect, test } from '@playwright/test';

export class SubscriptionsNewPage {
  static readonly route = '/subscriptions/new';

  /** The control labelled "Plan" on the page */
  private readonly planField: Locator;
  /** The control labelled "body" on the page */
  private readonly bodyLocator: Locator;

  constructor(private readonly page: Page) {
    this.planField = page.getByLabel('Plan');
    this.bodyLocator = page.locator('body');
  }

  async expectLoaded(): Promise<void> {
    await test.step('expectLoaded()', async () => {
      await expect(this.planField).toBeVisible();
    }, { box: true });
  }
}
