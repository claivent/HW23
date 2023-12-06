"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class UsersMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }
  async create(uuObject) {
    return await super.insertMany(uuObject);
  }



}

module.exports = UsersMongo;
