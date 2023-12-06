"use strict";

const JokesMainUseCaseError = require("./jokes-main-use-case-error.js");
const USERS_ERROR_PREFIX = `${JokesMainUseCaseError.ERROR_PREFIX}users/`;

const Create = {
  UC_CODE: `${USERS_ERROR_PREFIX}create/`,


  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UsersDaoCreateFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}UsersDaoCreateFailed`;
      this.message = "Create users by users DAO create failed.";
      this.status = 400;
    }
  },
  UsersListDoesNotExist: class extends JokesMainUseCaseError {     //TODO 4. domácí úkol plná implementace
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}UsersDoesNotExist`;
      this.message = "UuObject users does not exist.";
    }
  },



};

module.exports = {
  Create
};
