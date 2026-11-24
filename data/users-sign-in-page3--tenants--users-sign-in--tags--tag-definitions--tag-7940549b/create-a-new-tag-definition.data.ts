import { credential, handOffId, recordIdFromUrl, recordRoute, restorePasswordWith, rowData, testData, withheld } from "../_omega.data";
const PASSWORD_VARIABLE = "TARGET_APP_PASSWORD";

export const usersSignInPage3TenantsUsersSignInTagsTagDefinitionsTag7940549bData = testData({
  "users-sign-in-page3--tenants--users-sign-in--tags--tag-definitions--tag-7940549b": {
    createANewTagDefinition: { username: "admin", password: credential(), description: `Created by an Omega test${crypto.randomUUID().slice(0, 6)}`, name: `omegatag${crypto.randomUUID().slice(0, 6)}` },
  },
}, PASSWORD_VARIABLE);
