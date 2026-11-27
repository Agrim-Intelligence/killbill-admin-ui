import { credential, handOffId, recordIdFromUrl, recordRoute, restorePasswordWith, rowData, testData, withheld } from "../_omega.data";
const PASSWORD_VARIABLE = "TARGET_APP_PASSWORD";

// Not recorded: "admin-user-verifies-tags.tagsPageOpensFromTheTenantsScreen.adminPassword" is the password of account "admin", so the test types an empty value.
// To set it, name the account's credential set in env/<environment>.values.json: {"credential": "admin"}.
export const adminUserVerifiesTagsData = testData({
  "admin-user-verifies-tags": {
    tagsPageOpensFromTheTenantsScreen: { username: "admin", adminPassword: "" },
  },
}, PASSWORD_VARIABLE);
