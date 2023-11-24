"use strict";
const SlistAbl = require("../../abl/slist-abl.js");

class SlistController {

  get(ucEnv) {
    return SlistAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  create(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return SlistAbl.create(awid, dtoIn);
  }
}

module.exports = new SlistController();
