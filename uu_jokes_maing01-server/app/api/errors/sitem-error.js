"use strict";

const JokesMainUseCaseError = require("./jokes-main-use-case-error.js");
const SITEM_ERROR_PREFIX = `${JokesMainUseCaseError.ERROR_PREFIX}sitem/`;

const SitemCreate = {
  UC_CODE: `${SITEM_ERROR_PREFIX}sitemCreate/`,
  
};

const SitemGet = {
  UC_CODE: `${SITEM_ERROR_PREFIX}sitemGet/`,
  
};

const SitemList = {
  UC_CODE: `${SITEM_ERROR_PREFIX}sitemList/`,
  
};

module.exports = {
  SitemList,
  SitemGet,
  SitemCreate
};
