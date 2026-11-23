import { credential, handOffId, recordIdFromUrl, recordRoute, restorePasswordWith, rowData, testData, withheld } from "../_omega.data";
const PASSWORD_VARIABLE = "TARGET_APP_PASSWORD";

export const usersSignInPage2TenantsUsersSignInEmbeddedPageData = testData({
  "users-sign-in-page2--tenants--users-sign-in--embedded-page": {
    verifyEmbeddedPageContentAndLink: { username: "admin", password: credential() },
  },
}, PASSWORD_VARIABLE);
