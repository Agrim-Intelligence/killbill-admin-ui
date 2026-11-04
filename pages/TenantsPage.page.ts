// Generated from pages/TenantsPage.selectors.json. Do not edit by hand:
// change the selectors JSON and regenerate, so the fix is one reviewable line.
import { Page, Locator, test } from '@playwright/test';

export class TenantsPage {
  static readonly route = '/tenants';

  /** The submit button on the sign-in form */
  private readonly saveButton: Locator;
  /** The control labelled "Kill Bill Logo" on the page */
  private readonly killBillLogoLink: Locator;
  /** The control labelled "#kb_tenant_id" on the page */
  private readonly kbTenantIdLocator: Locator;

  constructor(private readonly page: Page) {
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.killBillLogoLink = page.getByRole('link', { name: 'Kill Bill Logo' });
    this.kbTenantIdLocator = page.locator('#kb_tenant_id');
  }

  async killBillLogo(): Promise<void> {
    await test.step('killBillLogo()', async () => {
      await this.killBillLogoLink.click();
    }, { box: true });
  }

  async save(kbTenantId: string): Promise<void> {
    await test.step('save()', async () => {
      await this.kbTenantIdLocator.selectOption(kbTenantId);
      await this.saveButton.click();
    }, { box: true });
  }
}
