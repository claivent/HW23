const {TestHelper} = require("uu_appg01_server-test");
const {SLIST_CREATE, SLIST_LIST, MONGO_ID} = require('../general-test-hepler')


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
});
describe("uuCmd slist/list", () => {
  test("HDS", async () => {
    await TestHelper.initUuAppWorkspace({uuAppProfileAuthorities: ".", state: "active"});
    await TestHelper.login("Authorities");

    // create shopping list
    await TestHelper.executePostCommand(SLIST_CREATE, {name: "shopp1", notes: "test1"});
    await TestHelper.executePostCommand(SLIST_CREATE, {name: "shopp2", notes: "test2"});
    await TestHelper.executePostCommand(SLIST_CREATE, {name: "shopp13", notes: "test3"});


    let response = await TestHelper.executeGetCommand(SLIST_LIST);
    expect(response.status).toEqual(200);
    let dtoOut = response;
    expect(dtoOut.pageInfo.total).toEqual(3);
    expect(dtoOut.pageInfo.pageIndex).toEqual(0);
    expect(dtoOut.pageInfo.pageSize).toEqual(1000);
    // by default, list is ordered by name in ascending order
    expect(dtoOut.itemList[0].name).toEqual("shopp1");


  });


  test("A1", async () => {
    await TestHelper.initUuAppWorkspace({uuAppProfileAuthorities: ".", state: "active"});
    await TestHelper.login("Authorities");

    try {
      await TestHelper.executeGetCommand(SLIST_LIST);
    } catch (e) {
      console.log(e);
    }


  });

});
