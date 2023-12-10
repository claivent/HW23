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
  },

  SlistDaoCreateFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}SlistDaoCreateFailed`;
      this.message = "Create slist by slist DAO create failed.";
      this.status = 400;
    }
  },




};

const Get = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}slist/get/`,


  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  DocumentNotExist: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}documentNotExist`;
      this.message = "Document is no more in Database";
    }
  },


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


  DocumentNotExist: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}documentNotExist`;
      this.message = "Document is no more in Database";
    }
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

  DocumentNotExist: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}documentNotExist`;
      this.message = "Document is no more in Database";
    }
  },


  UserNotAuthorizedEdit: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}userNotAuthorizedEdit`;
      this.message = "You are not member or owner of this document";
    }
  },
};

const Update = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}slist/update/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SlistDaoCreateFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}SlistDaoCreateFailed`;
      this.message = "Create slist by slist DAO create failed.";
      this.status = 400;
    }
  },

  DocumentNotExist: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}documentNotExist`;
      this.message = "Document is no more in Database";
    }
  },


  UserNotAuthorizedEdit: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}userNotAuthorizedEdit`;
      this.message = "You are not member or owner of this document";
    }
  },

  NotEditPrivateAttributes: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}notEditPrivateAttributes`;
      this.message = "You can not edit private attributes";
    }
  },


};



module.exports = {
  Update,
  Delete,
  List,
  Get,
  Create,
};
