"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/slist-error.js");
const InstanceChecker = require("../component/instance-checker");
const { Profiles, Schemas, Jokes } = require("../abl/constants");

const WARNINGS = {

};

class SlistAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("slist");
  }

  async create(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("slistCreateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Errors.Create.InvalidDtoIn
    );

    const addedValues = {
      sys: {
        cts: "sys.cts",
        mts: "sys.mts",
        rev: 0
      },
      owner_id: "100-55-44",
      owner_name: session.getIdentity().getName(),
      averageRating: 0,
      ratingCount: 0,
      visibility: authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES),
      uuIdentity: session.getIdentity().getUuIdentity(),
      uuIdentityName: session.getIdentity().getName(),
    };

   const dtoOut={
     ...dtoIn,

     sys: {
       cts: "sys.cts",
       mts: "sys.mts",
       rev: 0
     },
     owner_id: "100-55-44",
     members: [],
     shoppingItems: [],
     isArchived: false,
     uuAppErrorMap:  uuAppErrorMap
    }
    return  dtoOut;
  }

}

module.exports = new SlistAbl();
