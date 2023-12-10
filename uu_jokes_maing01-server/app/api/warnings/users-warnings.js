const Errors = require("../errors/users-error");

const Warnings = {
  CreateUsersInitData: {
    UnsupportedKeys: { code: `${Errors.CreateUsersInitData.UC_CODE}unsupportedKeys`, },
  },
  List: {
    UnsupportedKeys: { code: `${Errors.List.UC_CODE}unsupportedKeys`, },
  },
  Get: {
    UnsupportedKeys: { code: `${Errors.Get.UC_CODE}unsupportedKeys`, },
    UserIsNotInDb: { code: `${Errors.Get.UC_CODE}userisnotindb`, },
  },
  Create: {
    UnsupportedKeys: { code: `${Errors.Create.UC_CODE}unsupportedKeys`, },
  },
  Update: {
    UnsupportedKeys: { code: `${Errors.Update.UC_CODE}unsupportedKeys`, },
  },
  Delete: {
    UnsupportedKeys: { code: `${Errors.Delete.UC_CODE}unsupportedKeys`, },
  },








};
module.exports = Warnings;
