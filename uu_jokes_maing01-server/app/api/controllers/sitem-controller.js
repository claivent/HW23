"use strict";
const SitemAbl = require("../../abl/sitem-abl.js");

class SitemController {

  sitemCreate(ucEnv) {
    return SitemAbl.sitemCreate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new SitemController();
