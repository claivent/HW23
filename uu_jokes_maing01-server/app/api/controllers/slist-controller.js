"use strict";
const SlistAbl = require("../../abl/slist-abl.js");

class SlistController {

  create(ucEnv) {
    return SlistAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new SlistController();
