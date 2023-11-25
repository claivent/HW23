"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/sitem-error.js");
const Warnings = require("../api/warnings/slist-warnings");

const WARNINGS = {

};

class SitemAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("sitem");
  }

  async update(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    const validationResult = this.validator.validate("sitemUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn, validationResult, uuAppErrorMap, Warnings.Create.UnsupportedKeys.code, Errors.Create.InvalidDtoIn
    );

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn,  uuAppErrorMap };
    return dtoOut;
  }

  async delete(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    const validationResult = this.validator.validate("sitemDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn, validationResult, uuAppErrorMap, Warnings.Create.UnsupportedKeys.code, Errors.Create.InvalidDtoIn
    );

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn,  uuAppErrorMap };
    return dtoOut;
  }

  async list(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    // validation of dtoIn
    const validationResult = this.validator.validate("sitemListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn, validationResult, uuAppErrorMap, Warnings.Create.UnsupportedKeys.code, Errors.Create.InvalidDtoIn
    );

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn,  uuAppErrorMap };
    return dtoOut;
  }

  async get(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("sitemGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn, validationResult, uuAppErrorMap, Warnings.Create.UnsupportedKeys.code, Errors.Create.InvalidDtoIn
    );

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn,  uuAppErrorMap };
    return dtoOut;
  }

  async create(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("sitemCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn, validationResult, uuAppErrorMap, Warnings.Create.UnsupportedKeys.code, Errors.Create.InvalidDtoIn
    );

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn,  uuAppErrorMap };
    return dtoOut;
  }



}

module.exports = new SitemAbl();
