"use strict";
const UsersAbl = require("../../abl/users-abl.js");

class UsersController {

  create(ucEnv) {
    return UsersAbl.create(
      ucEnv.getUri().getAwid(),
      ucEnv.getDtoIn(),
      ucEnv.getSession(),
      ucEnv.getAuthorizationResult()
    );
  }

}

module.exports = new UsersController();
