
"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const Errors = require("../api/errors/slist-error.js");
const Warnings = require("../api/warnings/slist-warnings");
const ShopList = require("../_mock/list.json");
const ShopLists = require("../_mock/lists.json");
const { Utils } = require("uu_appg01_server");
const { Profiles, Schemas } = require("../abl/constants");


let UsersAbl = require("./users-abl.js");


class SlistAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.SLIST);
    this.dao2 = DaoFactory.getDao(Schemas.USERS);

  }
  async create(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("slistCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn, validationResult, uuAppErrorMap, Warnings.Create.UnsupportedKeys.code, Errors.Create.InvalidDtoIn
    );

    const owner_id = session.getIdentity().getUuIdentity();
    const owner_name = session.getIdentity().getName();
    const added_values = {members: [], shoppingItems: [], isArchived: false};

    // save slist to uuObjectStore
    const uuObject = {      ...dtoIn, awid, owner_id, owner_name, ...added_values    };

    // create shopping list
    let slist;
    try {
      slist = await this.dao.create(uuObject);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.SlistDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    //check if user exists in db. if so update his/her information otherwise create new user it can be used as members
    let user;
    try {
      user = await  this.dao2.get(awid, owner_id);
      console.log(user, "user");
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.SlistDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    user ? await this.dao2.update(session.getIdentity()) : await this.dao2.create(session.getIdentity());

    // prepare and return dtoOut
    const dtoOut = { ...slist,  uuAppErrorMap };
    return dtoOut;

  }



  async update(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    const validationResult = this.validator.validate("slistUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn, validationResult, uuAppErrorMap,  Warnings.Update.UnsupportedKeys.code, Errors.Update.InvalidDtoIn
    );

    // check if document exist and  user can modify document


    let userResult = await this.dao.get(awid, dtoIn.id);
    if(!userResult) {
      throw new Errors.Update.DocumentNotExist(uuAppErrorMap, { Document_Id: dtoIn.id });
    }

    const sesId = authorizationResult
    const userId = sesId['_uuIdentity'];

    const owner = userResult.owner_id === userId;
    const member = userResult.members.includes(userId);
    const privateAttributes = ["owner_id", "isArchived"];  //members not allow change this attribut

    if(!owner && !member){
      throw new Errors.Update.UserNotAuthorizedEdit(uuAppErrorMap, { user_Id: userId });
    }
    for (const attribute of privateAttributes) {
      if (attribute in privateAttributes && !owner) {
        throw new Errors.Update.NotEditPrivateAttributes(uuAppErrorMap, {user_Id: userId});
      }
    }

    // prepare and return dtoOut
    let daoResult;
    const uuObject = {...dtoIn};
    const id = uuObject.id;
    delete uuObject.id;
    /*Try change is archived*/
    /*uuObject.isArchived = false;*/
    if (dtoIn) {
      daoResult = await this.dao.update(uuObject, id);
    }

    // prepare and return dtoOut
    const dtoOut = { ...daoResult,  uuAppErrorMap };
    return dtoOut;
  }





  async delete(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    const validationResult = this.validator.validate("slistDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn, validationResult, uuAppErrorMap, Warnings.Create.UnsupportedKeys.code, Errors.Create.InvalidDtoIn
    );


      let userResult = await this.dao.get(awid, dtoIn.id);
      if(!userResult) {
        throw new Errors.Delete.DocumentNotExist(uuAppErrorMap, { Document_Id: dtoIn.id });
      }

      const sesId = authorizationResult
      const userId = sesId['_uuIdentity'];

      const owner = userResult.owner_id === userId;

      if(!owner ){
        throw new Errors.Delete.UserNotAuthorizedEdit(uuAppErrorMap, { user_Id: userId });
      }




      let daoResult;
      if (dtoIn) {
        daoResult = await this.dao.delete(awid, dtoIn.id);
      }


      // prepare and return dtoOut
      const dtoOut = { ...daoResult,  uuAppErrorMap };
      return dtoOut;
  }





  async list(awid, dtoIn, session, authorizationResult) {
     let uuAppErrorMap = {};
    const DEFAULTS = {
      sortBy: "name",
      order: "asc",
      pageIndex: 0,
      pageSize: 100,
    };

    // validation of dtoIn
    // validation of dtoIn
    const validationResult = this.validator.validate("slistListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn, validationResult, uuAppErrorMap, Warnings.Create.UnsupportedKeys.code, Errors.Create.InvalidDtoIn
    );

    // 1.4
    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;

    const sesId = authorizationResult
    const userId = sesId['_identity']['_uuIdentity'];

    const filter = {
      "$or": [
        {"owner_id": userId},
        {"members": new RegExp(`.*${userId}.*`, "i")}
      ]
    };




    let daoResult;
    if (dtoIn) {
      daoResult = await this.dao.list(awid, filter, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    }
    if(!daoResult) {
      throw new Errors.List.DocumentNotExist(uuAppErrorMap, { Document_Id: dtoIn.id });
    }

    // prepare and return dtoOut
    const dtoOut = { ...daoResult,  uuAppErrorMap };
    return dtoOut;
  }




  async get(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("slistGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn, validationResult, uuAppErrorMap, Warnings.Get.UnsupportedKeys.code, Errors.Get.InvalidDtoIn
    );

    let daoResult;
    if (dtoIn) {
      daoResult = await this.dao.get(awid, dtoIn.id);
    }
    if(!daoResult) {
      throw new Errors.Get.DocumentNotExist(uuAppErrorMap, { Document_Id: dtoIn.id });
    }


    // prepare and return dtoOut
    const dtoOut = { ...daoResult,  uuAppErrorMap };
    return dtoOut;
  }


}

module.exports = new SlistAbl();
