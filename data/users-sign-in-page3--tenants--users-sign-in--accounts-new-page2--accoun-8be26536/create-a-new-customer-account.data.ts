import { credential, handOffId, recordIdFromUrl, recordRoute, restorePasswordWith, rowData, testData, withheld } from "../_omega.data";
export { handOffId, recordIdFromUrl };
const PASSWORD_VARIABLE = "TARGET_APP_PASSWORD";

export const usersSignInPage3TenantsUsersSignInAccountsNewPage2Accoun8be26536Data = testData({
  "users-sign-in-page3--tenants--users-sign-in--accounts-new-page2--accoun-8be26536": {
    createANewCustomerAccount: { username: "admin", password: credential(), userName: `TestAccount${crypto.randomUUID().slice(0, 6)}`, email: "" },
  },
}, PASSWORD_VARIABLE);
