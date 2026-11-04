// Generated from pages/TenantsPage.selectors.json. Do not edit by hand:
// change the selectors JSON and regenerate, so the fix is one reviewable line.
import { Page, Locator, test } from '@playwright/test';

export class TenantsPage {
  static readonly route = '/tenants';

  /** The submit button on the sign-in form */
  private readonly saveButton: Locator;

  constructor(private readonly page: Page) {
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async save(): Promise<void> {
    await test.step('save()', async () => {
      await this.saveButton.click();
    }, { box: true });
  }
}
