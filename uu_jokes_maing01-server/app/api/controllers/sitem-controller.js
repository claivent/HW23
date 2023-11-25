"use strict";
const SitemAbl = require("../../abl/sitem-abl.js");

class SitemController {

  sitemUpdate(ucEnv) {
    return SitemAbl.sitemUpdate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  sitemDelete(ucEnv) {
    return SitemAbl.sitemDelete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  sitemList(ucEnv) {
    return SitemAbl.sitemList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  sitemGet(ucEnv) {
    return SitemAbl.sitemGet(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  sitemCreate(ucEnv) {
    return SitemAbl.sitemCreate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new SitemController();
