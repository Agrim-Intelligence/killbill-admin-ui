import { credential, handOffId, recordIdFromUrl, recordRoute, restorePasswordWith, rowData, testData, withheld } from "../_omega.data";
const PASSWORD_VARIABLE = "TARGET_APP_PASSWORD";

export const usersSignInPage3TenantsUsersSignInEmbeddedPageData = testData({
  "users-sign-in-page3--tenants--users-sign-in--embedded-page": {
    verifyNavigationToAndContentOfTheEmbeddedPage: { username: "admin", password: credential() },
  },
}, PASSWORD_VARIABLE);
