import { credential, handOffId, recordIdFromUrl, recordRoute, restorePasswordWith, rowData, testData, withheld } from "../_omega.data";
const PASSWORD_VARIABLE = "TARGET_APP_PASSWORD";

// Not recorded: "tenant-management-page-navigation.embeddedPageOpensFromTheTenantsScreen.adminPassword" is the password of account "admin", so the test types an empty value.
// To set it, name the account's credential set in env/<environment>.values.json: {"credential": "admin"}.
export const tenantManagementPageNavigationData = testData({
  "tenant-management-page-navigation": {
    embeddedPageOpensFromTheTenantsScreen: { username: "admin", adminPassword: "" },
  },
}, PASSWORD_VARIABLE);
