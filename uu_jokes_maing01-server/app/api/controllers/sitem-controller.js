"use strict";
const SitemAbl = require("../../abl/sitem-abl.js");

class SitemController {

  sitemGet(ucEnv) {
    return SitemAbl.sitemGet(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  sitemCreate(ucEnv) {
    return SitemAbl.sitemCreate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new SitemController();
