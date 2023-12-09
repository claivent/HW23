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

 /* async get(awid, _uuIdentity) {
    let result = {};
    let filter = {

      _uuIdentity: _uuIdentity,
    };
    result = await super.findOne(filter, (err, documents, output) => {
      if (err) return ((output) => (output('Error getting user:')));
      if (documents.length === 0) return 'User not found'; else return 'User found';

    });
    return result;
  }*/


  async get(awid, id) {
    return await super.findOne({ id, awid });
  }

  async update(uuObject) {
    let result;
    let filter = {

      _uuIdentity: uuObject._uuIdentity,
    };
    result = await super.findOneAndUpdate(filter, uuObject, (err, output) => {
      if (err) return ((output) => (output('Error updating user:')));

    });
    return result;

  }

  async list(awid,sortBy, order, page) {
    const pageInfo = page;
    const sort = { [sortBy]: order === "asc" ? 1 : -1, };
    const filter = {};
    return await super.find(filter, pageInfo, sort);
  }
}

module.exports = UsersMongo;
