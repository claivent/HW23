"use strict";
const JokesMainUseCaseError = require("./jokes-main-use-case-error");

const Create = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}slist/create/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }

};

const Get = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}slist/get/`,

    slistDoesNotExist: class extends JokesMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${Get.UC_CODE}jokesDoesNotExist`;
        this.message = "UuObject jokes does not exist.";
      }
    },

};

module.exports = {
  Get,
  Create,
};
