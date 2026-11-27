import { credential, handOffId, recordIdFromUrl, recordRoute, restorePasswordWith, rowData, testData, withheld } from "../_omega.data";
const PASSWORD_VARIABLE = "TARGET_APP_PASSWORD";

export const kauiCustomerAccountCreationData = testData({
  "kaui-customer-account-creation": {
    createANewCustomerAccount: { username: "admin", password: credential(), userName: `username${crypto.randomUUID().slice(0, 6)}`, email: "" },
  },
}, PASSWORD_VARIABLE);
