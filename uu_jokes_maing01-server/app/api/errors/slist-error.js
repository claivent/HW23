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

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }


};

const List = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}slist/list/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ListDoesNotExist: class extends JokesMainUseCaseError {
    /* In Mongo Db not exist shopping lists */
    //TODO Bude plněno v dalších úkolech
  },


};

const Delete = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}slist/delete/`,
  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UserNotAuthorized: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
};

module.exports = {
  Delete,
  List,
  Get,
  Create,
};
