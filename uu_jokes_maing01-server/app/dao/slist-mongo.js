"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;



class SlistMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }
  async create(slist) {
    return await super.insertOne(slist);
  }

  async list(awid, sortBy, order, page) {
    const pageInfo = page;
    const sort = { [sortBy]: order === "asc" ? 1 : -1, };
    const filter = {};
    return await super.find(filter, pageInfo, sort);
  }

  async delete(awid, id) {
    return await super.deleteOne({ awid, id });
  }




}

module.exports = SlistMongo;
