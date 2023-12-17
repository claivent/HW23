"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class UsersMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, _uuIdentity: 1 }, { unique: true });
  }

  async createUsersInitData(uuObject) {
    await super.insertMany(uuObject);
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }



  async update(uuObject) {
    let result;
    let filter = {
      _uuIdentity: uuObject._uuIdentity,
    };
    let revisionStrategy = "REVISION";
    result = await super.findOneAndUpdate(filter, uuObject, "NONE" );
    /*(err, output) => {      if (err) return ((output) => (output('Error updating user:')    });*/

    return result;

  }

  async list(awid, filter, projection, sortBy, order, page) {
    const pageInfo = {...page }     ;
    const sort = { [sortBy]: order === "asc" ? 1 : -1, };
    return await super.find(filter, pageInfo, sort, projection);
  }

  async get(awid, _uuIdentity) {
    let filter={_uuIdentity:_uuIdentity}
    let projection = {};
    let sort = {};
    let result;
    result = await super.findOne(filter, projection, sort );
    return result;
  }

}

module.exports = UsersMongo;
