"use strict";

const JokesMainUseCaseError = require("./jokes-main-use-case-error.js");
const SITEM_ERROR_PREFIX = `${JokesMainUseCaseError.ERROR_PREFIX}sitem/`;

const Create = {
  UC_CODE: `${SITEM_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SitemDaoCreateFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}sitemDaoCreateFailed`;
      this.message = "Create sitem by sitem DAO create failed.";
    }
  },

  SitemDoesNotExist: class extends JokesMainUseCaseError {     //TODO 4. domácí úkol plná implementace
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}sitemDoesNotExist`;
      this.message = "UuObject sitem does not exist.";
    }
  },
  SitemNotInCorrectState: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}sitemNotInCorrectState`;
      this.message = "UuObject sitem is not in correct state.";
    }
  }

};

const Get = {
  UC_CODE: `${SITEM_ERROR_PREFIX}get/`,

  sitemDoesNotExist: class extends JokesMainUseCaseError {     //TODO 4. domácí úkol plná implementace
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}sitemDoesNotExist`;
      this.message = "UuObject sitem does not exist.";
    }
  },
  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }

};

const List = {
  UC_CODE: `${SITEM_ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  sitemDoesNotExist: class extends JokesMainUseCaseError {     //TODO 4. domácí úkol plná implementace
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}sitemDoesNotExist`;
      this.message = "UuObject sitem does not exist.";
    }
  },


};


const Delete = {
  UC_CODE: `${SITEM_ERROR_PREFIX}delete/`,
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

  sitemDoesNotExist: class extends JokesMainUseCaseError {     //TODO 4. domácí úkol plná implementace
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}sitemDoesNotExist`;
      this.message = "UuObject sitem does not exist.";
    }
  }
};


const Update = {
  UC_CODE: `${SITEM_ERROR_PREFIX}update/`,

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

  sitemDoesNotExist: class extends JokesMainUseCaseError {     //TODO 4. domácí úkol plná implementace
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}sitemDoesNotExist`;
      this.message = "UuObject sitem does not exist.";
    }
  }

};



module.exports = {
  Update,
  Delete,
  List,
  Get,
  Create
};
