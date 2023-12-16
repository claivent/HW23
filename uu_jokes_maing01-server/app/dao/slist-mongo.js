"use strict";
const {UuObjectDao} = require("uu_appg01_server").ObjectStore;


class SlistMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({awid: 1, _id: 1}, {unique: true});
    await super.createIndex({awid: 1, _name: 1}, {unique: true});

  }

  async create(slist) {
    return await super.insertOne(slist);
  }

  async list(awid, filterIn, userId, sortBy, order, page) {
    const pageInfo = page;
    const sort = {[sortBy]: order === "asc" ? 1 : -1,};
    const filter= filterIn;

    return await super.find(filter, pageInfo, sort);
  }

  async get(awid, id) {
    let filter = {_id: id}
    let projection = {};
    let sort = {};
    let result;
    result = await super.findOne(filter, projection, sort);
    return result;
  }

  async delete(awid, id) {
    return await super.deleteOne({awid, id});

  }

  async update(uuObject, id) {
    let result;
    let filter = {_id: id};
    let revisionStrategy = "REVISION";
    result = await super.findOneAndUpdate(filter, uuObject, "NONE" );
    /*(err, output) => {      if (err) return ((output) => (output('Error updating user:')    });*/

    return result;

  }

  async archive(uuObject, id) {
    let result;
    let filter = {_id: id};
    let revisionStrategy = "REVISION";
    result = await super.findOneAndUpdate(filter, uuObject, "NONE" );
    /*(err, output) => {      if (err) return ((output) => (output('Error updating user:')    });*/

    return result;

  }

}

module.exports = SlistMongo;
