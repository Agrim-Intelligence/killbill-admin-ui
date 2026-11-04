// Generated from pages/UsersSignInPage.selectors.json. Do not edit by hand:
// change the selectors JSON and regenerate, so the fix is one reviewable line.
import { Page, Locator, test } from '@playwright/test';

export class UsersSignInPage {
  static readonly route = '/users/sign_in';

  /** The username input on the sign-in form */
  private readonly usernameTextbox: Locator;
  /** The password input on the sign-in form */
  private readonly passwordTextbox: Locator;
  /** The submit button on the sign-in form */
  private readonly signInButton: Locator;

  constructor(private readonly page: Page) {
    this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });
    this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
  }

  async signIn(username: string, password: string): Promise<void> {
    await test.step('signIn()', async () => {
      await this.usernameTextbox.fill(username);
      await this.passwordTextbox.fill(password);
      await this.signInButton.click();
    }, { box: true });
  }
}
