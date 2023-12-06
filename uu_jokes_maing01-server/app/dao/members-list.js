"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;



class SlistMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }
  async create(slist) {
    return await super.insertOne(slist);
  }

  async list(awid, sortBy, order, pageInfo) {


    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };
    let lst = await super.find({ awid }, { sort, skip: pageInfo.pageIndex * pageInfo.pageSize, limit: pageInfo.pageSize });
    return lst;
  }

  async delete(awid, id) {
    await super.deleteOne({ awid, id });
  }
}

module.exports = SlistMongo;
