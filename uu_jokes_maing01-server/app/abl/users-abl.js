"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/users-error.js");
const Warnings = require("../api/warnings/users-warnings");
const { Profiles, Schemas, Slists } = require("./constants");

class UsersAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("users");
  }

  async list(awid, dtoIn, session, authorizationResult) {
    console.log("init",dtoIn);
    let uuAppErrorMap = {};
    let filter = {};
    let projection = {};
    dtoIn.filter ? filter = dtoIn.filter: filter;
    dtoIn.projection ? projection = dtoIn.projection: projection;


    const DEFAULTS = { sortBy: "name", order: "asc", pageIndex: 0, pageSize: 100, };
    // validation of dtoIn
    const validationResult = this.validator.validate("slistListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, uuAppErrorMap, Warnings.List.UnsupportedKeys.code, Errors.List.InvalidDtoIn);
    // set a default value

    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;

    //get list of shopping list
    let daoResult;


    if (dtoIn) {

      daoResult = await this.dao.list(awid, filter, projection, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    }

    // prepare and return dtoOut
    const dtoOut = { ...daoResult, uuAppErrorMap };
    return dtoOut;
  }

  async get(awid, dtoIn,  session, authorizationResult) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("usersGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn, validationResult, uuAppErrorMap, Warnings.Get.UnsupportedKeys.code, Errors.Get.InvalidDtoIn
    );

    let daoResult;
    if (dtoIn) {
      daoResult = await this.dao.get(awid, dtoIn._uuIdentity);
      if(!daoResult) {
        /*throw new Errors.Get.UserDoesNotExist(uuAppErrorMap, { userID: dtoIn._uuIdentity });*/
        uuAppErrorMap = { Warnings: "User  is not in db"};
        const dtoOut = { daoResult, uuAppErrorMap };
        return dtoOut;
      }
    }

    // prepare and return dtoOut
    const dtoOut = { daoResult,  uuAppErrorMap };
    return dtoOut;
  }


  async create(awid, dtoIn, session, authorizationResult) {
      let uuAppErrorMap = {};

      // validation of dtoIn
      const validationResult = this.validator.validate("usersCreateDtoInType", dtoIn);
      uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn, validationResult, uuAppErrorMap, Warnings.Create.UnsupportedKeys.code, Errors.Create.InvalidDtoIn
      );

      const owner_id = session.getIdentity().getUuIdentity();

      //check if user exists in db. if so update his/her information otherwise create new user it can be used as members
      let user;
      try {
        user =  await this.get( awid, {_uuIdentity: owner_id},  session, authorizationResult);
        console.log("result",user);
      } catch (e) {
        if (e instanceof ObjectStoreError) {
          const dtoOut = { user };
          return dtoOut;
        }
        throw e;
      }
      let result={ message:"",output:""}
      if(user.daoResult !== null) {
        result.message = "User is in Db. User is updated" ;
        result.output =  await this.dao.update(session.getIdentity()); }
      else
      {
        result.message = "User is not in Db. User is created" ;
        result.output = await this.dao.create(session.getIdentity())
      }

      // prepare and return dtoOut
      const dtoOut = { ...user, ...result,  uuAppErrorMap };
         console.log("result",dtoOut);
      return dtoOut;

    }


  async update(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("usersUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn, validationResult, uuAppErrorMap, Warnings.Update.UnsupportedKeys.code, Errors.Update.InvalidDtoIn
    );

    const owner_id = session.getIdentity().getUuIdentity();

    //check if user exists in db. if so update his/her information otherwise update new user it can be used as members
    let user;
    try {
      user =  await this.get( awid, {_uuIdentity: owner_id},  session, authorizationResult);
      console.log("result",user);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        const dtoOut = { user };
        return dtoOut;
      }
      throw e;
    }

    if(user.daoResult !== null) { await this.dao.update(session.getIdentity()); }
    else
    {await this.dao.update(session.getIdentity())}

    // prepare and return dtoOut
    const dtoOut = { ...user,  uuAppErrorMap };
    console.log("result",dtoOut);
    return dtoOut;

  }

  async delete(awid, dtoIn, session, authorizationResult) {

  }

  async createUsersInitData(awid, dtoIn) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("usersInitDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn, validationResult, uuAppErrorMap, Warnings.CreateUsersInitData.UnsupportedKeys.code, Errors.CreateUsersInitData.InvalidDtoIn
    );

    const uuObject = [
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-2589-1532", _name: "Lucie Tichá", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-1543-5486", _name: "Petr Novák", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-2582-1533", _name: "Jana Křížová", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-1544-5487", _name: "Tomáš Procházka", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-2583-1534", _name: "Eva Svobodová", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-1545-5488", _name: "Jan Kovář", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-2584-1535", _name: "Kateřina Marešová", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-1546-5489", _name: "Pavel Novotný", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-2585-1536", _name: "Zuzana Dvořáková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-1547-5490", _name: "Michal Prokop", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-2586-1537", _name: "Veronika Malá", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-1548-5491", _name: "Jakub Navrátil", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-2587-1538", _name: "Martina Růžičková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-1549-5492", _name: "Hana Nováková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-1550-5493", _name: "Tomáš Havel", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-2588-1539", _name: "Ivana Nováková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-1551-5494", _name: "Josef Vávra", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-2589-1540", _name: "Karolína Konečná", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-1552-5495", _name: "Miroslav Pospíšil", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-2590-1541", _name: "Tereza Kovářová", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-1553-5496", _name: "David Svoboda", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-2591-1542", _name: "Barbora Králová", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-1554-5497", _name: "Radek Nový", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-2592-1543", _name: "Lenka Marečková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-1555-5498", _name: "Šárka Vlčková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-2593-1544", _name: "Ondřej Šebek", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-1556-5499", _name: "Michaela Procházková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-2594-1545", _name: "Jakub Havlík", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" },
      { awid: "22222222222222222222222222222222", _uuIdentity: "0000-0000-1557-5500", _name: "Marie Šimáčková", _type: "uuPerson", _accountType: "standard", _authenticationLevelOfAssurance: "standard" }
    ];

    let result;

    result = await this.dao.createUsersInitData(uuObject);

    // prepare and return dtoOut
    const dtoOut = { awid, ...result, uuAppErrorMap };
    return dtoOut;

  }

}

module.exports = new UsersAbl();

