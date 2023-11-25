"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/sitem-error.js");

const WARNINGS = {

};

class SitemAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("sitem");
  }

  async sitemUpdate(awid, dtoIn) {
    
  }

  async sitemDelete(awid, dtoIn) {
    
  }

  async sitemList(awid, dtoIn) {
    
  }

  async sitemGet(awid, dtoIn) {
    
  }

  async sitemCreate(awid, dtoIn) {
    
  }

}

module.exports = new SitemAbl();
