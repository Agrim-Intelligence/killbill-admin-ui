// Generated from pages/HomePage.selectors.json. Do not edit by hand:
// change the selectors JSON and regenerate, so the fix is one reviewable line.
import { Page, Locator, test } from '@playwright/test';

export class HomePage {
  static readonly route = '/home';

  /** The bannerControl control on the page */
  private readonly bannerControl: Locator;
  /** The control labelled "logout" on the page */
  private readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.bannerControl = page.getByRole('banner');
    this.logoutLink = page.getByRole('link', { name: 'logout' });
  }

  async logout(): Promise<void> {
    await test.step('logout()', async () => {
      await this.logoutLink.click();
    }, { box: true });
  }
}
