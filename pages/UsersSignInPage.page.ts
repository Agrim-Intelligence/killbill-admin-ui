// Generated from pages/UsersSignInPage.selectors.json. Do not edit by hand:
// change the selectors JSON and regenerate, so the fix is one reviewable line.
import { Page, Locator, test } from '@playwright/test';

export class UsersSignInPage {
  static readonly route = '/users/sign_in';

  /** The submit button on the sign-in form */
  private readonly signInButton: Locator;
  /** The password input on the sign-in form */
  private readonly passwordTextbox: Locator;
  /** The username input on the sign-in form */
  private readonly usernameTextbox: Locator;

  constructor(private readonly page: Page) {
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
    this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });
  }

  async signIn(username: string, password: string): Promise<void> {
    await test.step('signIn()', async () => {
      await this.usernameTextbox.fill(username);
      await this.passwordTextbox.fill(password);
      await this.signInButton.click();
    }, { box: true });
  }
}
