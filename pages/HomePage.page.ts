// Generated from pages/HomePage.selectors.json. Do not edit by hand:
// change the selectors JSON and regenerate, so the fix is one reviewable line.
import { Page, Locator, expect, test } from '@playwright/test';

export class HomePage {
  static readonly route = '/home';

  /** The bannerControl control on the page */
  private readonly bannerControl: Locator;

  constructor(private readonly page: Page) {
    this.bannerControl = page.getByRole('banner');
  }

  async expectLoaded(): Promise<void> {
    await test.step('expectLoaded()', async () => {
      await expect(this.bannerControl).toBeVisible();
    }, { box: true });
  }
}
