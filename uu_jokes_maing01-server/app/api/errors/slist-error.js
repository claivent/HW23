"use strict";

const JokesMainUseCaseError = require("./jokes-main-use-case-error.js");
const SLIST_ERROR_PREFIX = `${JokesMainUseCaseError.ERROR_PREFIX}slist/`;

const Create = {
  UC_CODE: `${SLIST_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

};

module.exports = {
  Create
};
