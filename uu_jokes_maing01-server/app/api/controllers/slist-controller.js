"use strict";
const SlistAbl = require("../../abl/slist-abl.js");

class SlistController {



  update(ucEnv) {
    return SlistAbl.update(
      ucEnv.getUri().getAwid(),
      ucEnv.getDtoIn(),
      ucEnv.getSession(),
      ucEnv.getAuthorizationResult()
    );
  }

  delete(ucEnv) {
    return SlistAbl.delete(
      ucEnv.getUri().getAwid(),
      ucEnv.getDtoIn(),
      ucEnv.getSession(),
      ucEnv.getAuthorizationResult()
    );
  }

  list(ucEnv) {
    return SlistAbl.list(
      ucEnv.getUri().getAwid(),
      ucEnv.getDtoIn(),
      ucEnv.parameters,
      ucEnv.getSession(),
      ucEnv.getAuthorizationResult()
    );
  }


  get(ucEnv) {
    return SlistAbl.get(
      ucEnv.getUri().getAwid(),
      ucEnv.getDtoIn(),
      ucEnv.getSession(),
      ucEnv.getAuthorizationResult()
    );
  }

  create(ucEnv) {
    return SlistAbl.create(
      ucEnv.getUri().getAwid(),
      ucEnv.getDtoIn(),
      ucEnv.getSession(),
      ucEnv.getAuthorizationResult()
    );
  }
}

module.exports = new SlistController();
