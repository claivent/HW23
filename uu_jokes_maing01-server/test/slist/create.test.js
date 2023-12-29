const { TestHelper } = require("uu_appg01_server-test");
const {SLIST_CREATE, mockDaoFactory} = require('../general-test-hepler');


beforeAll(async () => {
  await TestHelper.setup();

});

afterAll(() => {
  TestHelper.teardown();
});

beforeEach(async () => {
  await TestHelper.dropDatabase();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.login("AwidLicenseOwner", false);
  await TestHelper.initUuAppWorkspace({uuAppProfileAuthorities: ".", state: "active"});
});

describe("uuCmd slist/create", () => {
  test("HDS document has been created", async () => {
    console.log("XXXXXXXXXX     Start delete.test.js  (HDS)         XXXXXXXXXX")
    const dtoIn = {
      name: "shopping list",
      notes: "I am  planning buying some food",
    };

    await TestHelper.login("Authorities");

    const result = await TestHelper.executePostCommand(SLIST_CREATE, dtoIn);
    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.notes).toEqual(dtoIn.notes);
    expect(result.data.owner_id).toEqual("3039-912-8064-0000");
    expect(result.data.awid).toEqual(TestHelper.awid);
    expect(result.data.uuAppErrorMap).toEqual({});
  });

  test("A1 warning unsupportedKeyList ", async () => {
    console.log("XXXXXXXXXX     Start delete.test.js  (A1 warning unsupportedKeyList)         XXXXXXXXXX")
    const dtoIn = {
      name: "shopping list",
      notes: "I am  planning buying some food",
      unknowAttribut: "ffff lisfft"
    };
     let result =  await TestHelper.executePostCommand(SLIST_CREATE, dtoIn);

    expect(result.data.uuAppErrorMap).toMatchObject({
      "uu-jokes-main/slist/create/unsupportedKeys": {
        "message": "DtoIn contains unsupported keys.",
        "paramMap": {"unsupportedKeyList": ["$.unknowAttribut"]}, "type": "warning"
      }});


  });

  test("A2 - invalid dtoIn", async () => {
    console.log("XXXXXXXXXX     Start delete.test.js  (A2 - invalid dtoIn)         XXXXXXXXXX")
    const dtoIn = {};
    expect.assertions(3);
    try {
       await TestHelper.executePostCommand("slist/create", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uu-jokes-main/slist/create/invalidDtoIn");
      expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(2);
      expect(e.status).toEqual(400);
    }
  });

  test("A3 text is longer then is allowed", async () => {
    console.log("XXXXXXXXXX     Start delete.test.js  (A3 text is longer then is allowed)         XXXXXXXXXX")
    let notes = "";
    while (notes.length !== 4001){notes = notes + "a"; }
    let name= notes.substring(0,101);
    const dtoIn = {
      name: name,
      notes: notes
    };
    expect.assertions(3);
    try {
      await TestHelper.executePostCommand("slist/create", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uu-jokes-main/slist/create/invalidDtoIn");
      expect(Object.keys(e.paramMap.invalidValueKeyMap).length).toEqual(3);
      expect(e.status).toEqual(400);
    }
  });



});
