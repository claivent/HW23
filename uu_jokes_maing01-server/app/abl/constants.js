//@@viewOn:constants
const Constants = {
  Schemas: {
    JOKES_MAIN: "jokesMain",
    SLIST: "slist",
    USERS: "users",

  },

  Slists: {
    States: {
      INIT: "init",
      ACTIVE: "active",
      UNDER_CONSTRUCTION: "underConstruction",
      CLOSED: "closed",
    },
    get NonFinalStates() {
      return new Set([this.States.ACTIVE, this.States.UNDER_CONSTRUCTION]);
    },
  },

  Profiles: {
    AUTHORITIES: "Authorities",
    EXECUTIVES: "Executives",
    AUTHENTICATED: "Authenticated",
    PUBLIC: "Public",
    READERS: "Readers",
  },

};
//@@viewOff:constants

//@@viewOn:exports
module.exports = Constants;
//@@viewOff:exports
