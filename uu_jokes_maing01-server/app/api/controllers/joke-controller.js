"use strict";
const JokeAbl = require("../../abl/joke-abl.js");

class JokeController {

  create(ucEnv) {
    return JokeAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new JokeController();
