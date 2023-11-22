const path = require("path");
const fs = require("fs");
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { Config } = require("uu_appg01_server").Utils;
Config.set("server_root", path.resolve(__dirname, ".."));

const SLIST_INSTANCE_INIT = "sys/uuAppWorkspace/init";
const SLIST_CREATE = "slist/create";
const MONGO_ID = "012345678910111213141516";



const mockDaoFactory = () => {
  // this mock ensures that all of the abl can be required
  jest.spyOn(DaoFactory, "getDao").mockImplementation(() => {
    let dao = {};
    dao.createSchema = () => {};
    return dao;
  });
};

const getSessionMock = (uuIdentity) => {
  let identity = {
    getUuIdentity: () => uuIdentity,
    getName: () => {},
  };
  return {
    getIdentity: () => identity,
  };
};

const getAuthzResultMock = () => {
  return {
    getAuthorizedProfiles: () => [],
  };
};

module.exports = {
  SLIST_INSTANCE_INIT,
  SLIST_CREATE,
  MONGO_ID,

  mockDaoFactory,
  getSessionMock,
  getAuthzResultMock,
};
