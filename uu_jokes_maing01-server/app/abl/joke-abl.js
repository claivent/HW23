"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/joke-error.js");

const WARNINGS = {

};

class JokeAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("joke");
  }

  async create(awid, dtoIn) {
      return {name:"sample joke",
      description: "joke Desc"
      }
  }

}

module.exports = new JokeAbl();
