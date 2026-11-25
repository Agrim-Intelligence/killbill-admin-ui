import { credential, handOffId, recordIdFromUrl, recordRoute, restorePasswordWith, rowData, testData, withheld } from "../_omega.data";
const PASSWORD_VARIABLE = "TARGET_APP_PASSWORD";

export const usersSignInPage3TenantsAdminAllowedUsersData = testData({
  "users-sign-in-page3--tenants--admin-allowed-users": {
    adminSeesTheirUserInTheAllowedUsersList: { username: "admin", password: credential() },
  },
}, PASSWORD_VARIABLE);
