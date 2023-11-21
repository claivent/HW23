"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class JokeMongo extends UuObjectDao {

  async createSchema(){
  }

}

module.exports = JokeMongo;
