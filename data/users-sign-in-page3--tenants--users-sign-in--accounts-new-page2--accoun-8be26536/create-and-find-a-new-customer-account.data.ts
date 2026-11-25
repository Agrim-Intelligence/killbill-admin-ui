import { credential, handOffId, recordIdFromUrl, recordRoute, restorePasswordWith, rowData, testData, withheld } from "../_omega.data";
const PASSWORD_VARIABLE = "TARGET_APP_PASSWORD";

export const usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data = testData({
  "users-sign-in-page3--tenants--users-sign-in--accounts-new-page2--accoun-8be26536": {
    createAndFindANewCustomerAccount: { username: "admin", password: credential(), userName: `TestAcct${crypto.randomUUID().slice(0, 6)}`, email: "", currency: "USD" },
  },
}, PASSWORD_VARIABLE);
