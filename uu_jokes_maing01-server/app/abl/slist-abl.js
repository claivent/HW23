
"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;

const Errors = require("../api/errors/slist-error.js");
const Warnings = require("../api/warnings/slist-warnings");
const ShopList = require("../_mock/list.json");
const ShopLists = require("../_mock/lists.json");
const { Utils } = require("uu_appg01_server");

class SlistAbl {

  constructor() {
    this.validator = Validator.load();

  }

  async get(awid, dtoIn) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    const validationResult = this.validator.validate("slistGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn };
    dtoOut.awid = awid;
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    dtoOut.mockList = ShopLists.find(lst=>lst.id === dtoIn.id)

    return dtoOut;

  }


  create(awid, dtoIn) {
    let uuAppErrorMap = {};
    let cTime = new Date().toISOString();

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
        cts: cTime,
        mts: cTime,
        rev: 0
      },
      owner_id: "100-55-44",
      members: [],
      shoppingItems: [],
      isArchived: false
    }

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn , addedValues};
    dtoOut.id = "5f91a4c8e485b9a64c89d236";
    dtoOut.awid = awid;
    dtoOut.addedValues;
    dtoOut.uuAppErrorMap = uuAppErrorMap;


    return dtoOut;
  }


}

module.exports = new SlistAbl();
