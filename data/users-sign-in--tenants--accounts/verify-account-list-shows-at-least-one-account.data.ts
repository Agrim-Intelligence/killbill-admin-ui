import { credential, handOffId, recordIdFromUrl, recordRoute, restorePasswordWith, rowData, testData, withheld } from "../_omega.data";
const PASSWORD_VARIABLE = "TARGET_APP_PASSWORD";

export const usersSignInTenantsAccountsData = testData({
  "users-sign-in--tenants--accounts": {
    verifyAccountListShowsAtLeastOneAccount: { username: "admin", password: credential(), kbTenantId: "Acme Test Tenant" },
  },
}, PASSWORD_VARIABLE);
