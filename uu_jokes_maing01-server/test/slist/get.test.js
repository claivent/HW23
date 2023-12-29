const {TestHelper} = require("uu_appg01_server-test");
const {SLIST_CREATE, SLIST_GET, MONGO_ID, SLIST_UPDATE} = require('../general-test-hepler')
let a,b,c = {};


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
  // create shopping list
  a = await TestHelper.executePostCommand(SLIST_CREATE, {name: "shopp1", notes: "test1"});
  b = await TestHelper.executePostCommand(SLIST_CREATE, {name: "shopp2", notes: "test2"});
  c = await TestHelper.executePostCommand(SLIST_CREATE, {name: "shopp13", notes: "test3"});
});
describe("uuCmd slist/get", () => {
  test("HDS", async () => {

    await TestHelper.login("Authorities");
    const dtoIn = {
      "id": a.id,
    }



    let response = await TestHelper.executeGetCommand(SLIST_GET, dtoIn);


    expect(response.name).toEqual("shopp1");
    expect(response.status).toEqual(200);
    expect(response.data.uuAppErrorMap).toEqual({});


  });

  test("A1 Warning unsupportedKeyList ", async () => {
    const dtoIn = {
      "unknowAttribut": "ffff lisfft",
      "id": b.id,
    };
    let result = await TestHelper.executeGetCommand(SLIST_GET, dtoIn);


    expect(result.data.uuAppErrorMap).toMatchObject({
      "uu-jokes-main/slist/get/unsupportedKeys": {
        "message": "DtoIn contains unsupported keys.",
        "paramMap": {"unsupportedKeyList": ["$.unknowAttribut"]}, "type": "warning"
      }
    });


  });


  test("A2 - invalid dtoIn", async () => {
    const dtoIn = {};
    expect.assertions(3);
    try {
      await TestHelper.executeGetCommand(SLIST_GET, dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uu-jokes-main/slist/get/invalidDtoIn");
      expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(1);
      expect(e.status).toEqual(400);
    }
  });


});
