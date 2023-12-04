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

  SlistDoesNotExist: class extends JokesMainUseCaseError {     //TODO 4. domácí úkol plná implementace
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}SlistDoesNotExist`;
      this.message = "UuObject slist does not exist.";
    }
  },
  SlistNotInCorrectState: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}SlistNotInCorrectState`;
      this.message = "UuObject Slist is not in correct state.";
    }
  }

};

const Get = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}slist/get/`,

  SlistDoesNotExist: class extends JokesMainUseCaseError {     //TODO 4. domácí úkol plná implementace
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}SlistDoesNotExist`;
      this.message = "UuObject slist does not exist.";
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
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}slist/list/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SlistDoesNotExist: class extends JokesMainUseCaseError {     //TODO 4. domácí úkol plná implementace
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}SlistDoesNotExist`;
      this.message = "UuObject slist does not exist.";
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

SlistDoesNotExist: class extends JokesMainUseCaseError {     //TODO 4. domácí úkol plná implementace
  constructor() {
    super(...arguments);
    this.code = `${Create.UC_CODE}SlistDoesNotExist`;
    this.message = "UuObject slist does not exist.";
  }
}
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
  UserNotAuthorized: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },

  SlistDoesNotExist: class extends JokesMainUseCaseError {     //TODO 4. domácí úkol plná implementace
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}SlistDoesNotExist`;
      this.message = "UuObject slist does not exist.";
    }
  }

};



module.exports = {
  Update,
  Delete,
  List,
  Get,
  Create,
};
