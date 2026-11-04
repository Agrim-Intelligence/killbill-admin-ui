// Generated from pages/AccountsPage.selectors.json. Do not edit by hand:
// change the selectors JSON and regenerate, so the fix is one reviewable line.
import { Page, Locator, expect, test } from '@playwright/test';

export class AccountsPage {
  static readonly route = '/accounts';

  /** The submit button on the sign-in form */
  private readonly advancedSearchButton: Locator;
  /** The control labelled "Search field" on the page */
  private readonly searchFieldField: Locator;
  /** The control labelled "Search value" on the page */
  private readonly searchValueTextbox: Locator;
  /** The submit button on the sign-in form */
  private readonly applySearchButton: Locator;
  /** The control labelled "Showing 1 to 1 of 1 entries (" on the page */
  private readonly showing1To1Of1EntriesText: Locator;

  constructor(private readonly page: Page) {
    this.advancedSearchButton = page.getByRole('button', { name: 'Advanced Search' });
    this.searchFieldField = page.getByLabel('Search field');
    this.searchValueTextbox = page.getByRole('textbox', { name: 'Search value' });
    this.applySearchButton = page.getByRole('button', { name: 'Apply Search' });
    this.showing1To1Of1EntriesText = page.getByText('Showing 1 to 1 of 1 entries (');
  }

  async advancedSearch(searchField: string, searchValue: string): Promise<void> {
    await test.step('advancedSearch()', async () => {
      await this.advancedSearchButton.click();
      await this.searchFieldField.selectOption(searchField);
      await this.searchValueTextbox.fill(searchValue);
      await this.applySearchButton.click();
    }, { box: true });
  }

  async expectLoaded(): Promise<void> {
    await test.step('expectLoaded()', async () => {
      await expect(this.showing1To1Of1EntriesText).toBeVisible();
    }, { box: true });
  }
}
