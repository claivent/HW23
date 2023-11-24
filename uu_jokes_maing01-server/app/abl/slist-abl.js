"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;

const Errors = require("../api/errors/slist-error.js");
const Warnings = require("../api/warnings/slist-warnings");

class SlistAbl {

  constructor() {
    this.validator = Validator.load();
  }

  create(awid, dtoIn) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("slistCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    const addedValues = {
      sys: {
        cts: "sys.cts",
        mts: "sys.mts",
        rev: 0
      },
      owner_id: "100-55-44",
      members: [],
      shoppingItems: [],
      isArchived: false
    }

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn , addedValues};
    dtoOut.awid = awid;
    dtoOut.addedValues;
    dtoOut.uuAppErrorMap = uuAppErrorMap;


    return dtoOut;
  }


}

module.exports = new SlistAbl();
