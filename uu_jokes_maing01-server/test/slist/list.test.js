const {TestHelper} = require("uu_appg01_server-test");
const {SLIST_CREATE, SLIST_LIST, MONGO_ID, SLIST_UPDATE} = require('../general-test-hepler')
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
describe("uuCmd slist/list", () => {
  test("HDS", async () => {

    await TestHelper.login("Authorities");
    const dtoIn = {
      "sortBy": "name",
      "order":  "desc",
      "pageInfo": {
        "pageIndex": 0,
        "pageSize": 2}
    }



    let response = await TestHelper.executeGetCommand(SLIST_LIST, dtoIn);

    expect(response.pageInfo.pageIndex).toEqual(0);
    expect(response.pageInfo.pageSize).toEqual(2);
    expect(response.pageInfo.total).toEqual(3);

    expect(response.itemList.length).toEqual(2);
    expect(response.itemList[0].name).toEqual("shopp2");
    expect(response.status).toEqual(200);
    expect(response.data.uuAppErrorMap).toEqual({});


  });

  test("A1 Warning unsupportedKeyList ", async () => {
    const dtoIn = {
      "unknowAttribut": "ffff lisfft",
      "sortBy": "name",
      "order":  "desc",
      "pageInfo": {
        "pageIndex": 0,
        "pageSize": 2}
    };
    let result = await TestHelper.executeGetCommand(SLIST_LIST, dtoIn);
    console.log("dddddddddddddddddddddddddd",result);

    expect(result.data.uuAppErrorMap).toMatchObject({
      "uu-jokes-main/slist/list/unsupportedKeys": {
        "message": "DtoIn contains unsupported keys.",
        "paramMap": {"unsupportedKeyList": ["$.unknowAttribut"]}, "type": "warning"
      }
    });


  });


  test("A2 - invalid dtoIn", async () => {
    const dtoIn =  {
      "sortBy": "namesss",
      "order":  "deaaasc",
      "pageInfo": {
        "pageIndex": 0,
        "pageSize": 2}
    };
    expect.assertions(3);
    try {
      await TestHelper.executeGetCommand(SLIST_LIST, dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uu-jokes-main/slist/list/invalidDtoIn");
      expect(Object.keys(e.paramMap.invalidValueKeyMap).length).toEqual(3);
      expect(e.status).toEqual(400);
    }
  });


});
