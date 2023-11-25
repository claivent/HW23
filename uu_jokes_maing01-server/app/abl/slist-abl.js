
"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;

const Errors = require("../api/errors/slist-error.js");
const Warnings = require("../api/warnings/slist-warnings");
const ShopList = require("../_mock/list.json");
const ShopLists = require("../_mock/lists.json");
const { Utils } = require("uu_appg01_server");
const { Profiles, Schemas } = require("../abl/constants");


class SlistAbl {

  constructor() {
    this.validator = Validator.load();

  }

  async update(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    const uuIdentity = session.getIdentity().getUuIdentity();
    const uuIdentityName = session.getIdentity().getName();
    const visibility = authorizationResult.getAuthorizedProfiles().includes(Profiles.EXECUTIVES);

    // validation of dtoIn
    const validationResult = this.validator.validate("slistUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn };

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    dtoOut.authorizationResult = authorizationResult;
    dtoOut.session = session ;
    dtoOut.jmeno = uuIdentityName;
    dtoOut.userId = uuIdentity;
    dtoOut.visibility= visibility;


    return dtoOut;
  }

  async delete(awid, dtoIn) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    const validationResult = this.validator.validate("slistDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn };

    dtoOut.uuAppErrorMap = uuAppErrorMap;



    return dtoOut;
  }

  async list(awid, dtoIn) {
     let uuAppErrorMap = {};
    // validation of dtoIn
    const validationResult = this.validator.validate("slistListDtoInType", dtoIn);
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
    dtoOut.itemList = ShopLists;


    return dtoOut;


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


  create(awid, dtoIn, session, authorizationResult) {
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
