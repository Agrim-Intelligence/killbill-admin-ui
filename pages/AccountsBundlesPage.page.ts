// Generated from pages/AccountsBundlesPage.selectors.json. Do not edit by hand:
// change the selectors JSON and regenerate, so the fix is one reviewable line.
import { Page, Locator, expect, test } from '@playwright/test';

export class AccountsBundlesPage {
  static readonly route = '/accounts/{record}/bundles';

  /** The control labelled "acme-monthly" on the page */
  private readonly acmeMonthlyCell: Locator;
  /** The control labelled "Cancel information" on the page */
  private readonly cancelInformationText: Locator;
  /** The submit button on the sign-in form */
  private readonly cancelButton: Locator;
  /** The control labelled "evergreen" on the page */
  private readonly evergreenText: Locator;

  constructor(private readonly page: Page) {
    this.acmeMonthlyCell = page.getByRole('cell', { name: 'acme-monthly' });
    this.cancelInformationText = page.getByText('Cancel information');
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.evergreenText = page.getByText('evergreen');
  }

  async expectLoaded(): Promise<void> {
    await test.step('expectLoaded()', async () => {
      await expect(this.acmeMonthlyCell).toBeVisible();
      await expect(this.cancelInformationText).toBeVisible();
      await expect(this.cancelButton).toBeVisible();
      await expect(this.evergreenText).toBeVisible();
      await expect(this.acmeMonthlyCell).toBeVisible();
    }, { box: true });
  }
}
