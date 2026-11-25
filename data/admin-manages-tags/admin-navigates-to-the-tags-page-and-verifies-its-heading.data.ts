import { credential, handOffId, recordIdFromUrl, recordRoute, restorePasswordWith, rowData, testData, withheld } from "../_omega.data";
const PASSWORD_VARIABLE = "TARGET_APP_PASSWORD";

export const adminManagesTagsData = testData({
  "admin-manages-tags": {
    adminNavigatesToTheTagsPageAndVerifiesItsHeading: { username: "admin", password: credential() },
  },
}, PASSWORD_VARIABLE);
