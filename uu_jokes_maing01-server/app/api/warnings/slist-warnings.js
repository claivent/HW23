const Errors = require("../errors/slist-error");

const Warnings = {
  Create: {
    UnsupportedKeys: { code: `${Errors.Create.UC_CODE}unsupportedKeys`, },
  },
  Get: {
    UnsupportedKeys: { code: `${Errors.Get.UC_CODE}unsupportedKeys`, },
  },

  List: {
    UnsupportedKeys: { code: `${Errors.Get.UC_CODE}unsupportedKeys`, },
  },

  Delete: {
    UnsupportedKeys: { code: `${Errors.Get.UC_CODE}unsupportedKeys`, },
  },

  Update: {
    UnsupportedKeys: { code: `${Errors.Get.UC_CODE}unsupportedKeys`, },
  },

  Archive: {
    UnsupportedKeys: { code: `${Errors.Get.UC_CODE}unsupportedKeys`, },
  },

};

module.exports = Warnings;
