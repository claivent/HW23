"use strict";

const JokesMainUseCaseError = require("./jokes-main-use-case-error.js");
const USERS_ERROR_PREFIX = `${JokesMainUseCaseError.ERROR_PREFIX}users/`;

const CreateUsersInitData = {
  UC_CODE: `${USERS_ERROR_PREFIX}createUsersInitData/`,


  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateUsersInitData.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UsersDaoCreateFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateUsersInitData.UC_CODE}UsersDaoCreateFailed`;
      this.message = "Create users by users DAO create failed.";
      this.status = 400;
    }
  },
  UsersListDoesNotExist: class extends JokesMainUseCaseError {     //TODO 4. domácí úkol plná implementace
    constructor() {
      super(...arguments);
      this.code = `${CreateUsersInitData.UC_CODE}UsersDoesNotExist`;
      this.message = "UuObject users does not exist.";
    }
  },



};

const List = {
  UC_CODE: `${USERS_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  UsersDoesNotExist: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}UsersDoesNotExist`;
      this.message = "UuObject Users does not exist.";
    }
  },
};

const Get = {
  UC_CODE: `${USERS_ERROR_PREFIX}get/`,

};

const Update = {
  UC_CODE: `${USERS_ERROR_PREFIX}update/`,

};

const Delete = {
  UC_CODE: `${USERS_ERROR_PREFIX}delete/`,

};

const Create = {
  UC_CODE: `${USERS_ERROR_PREFIX}create/`,

};

module.exports = {
  Create,
  Delete,
  Update,
  Get,
  List,
  CreateUsersInitData
};
