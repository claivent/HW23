const {TestHelper} = require("uu_appg01_server-test");
const {SLIST_UPDATE, SLIST_CREATE, SLIST_LIST} = require('../general-test-hepler')
let inputList = {};
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
  inputList = await TestHelper.executePostCommand(SLIST_CREATE, {name: "shopp1", notes: "test1"});
});

describe("uuCmd slist/update", () => {
  test("HDS", async () => {

    await TestHelper.login("Authorities");

    // create shopping list

    let response = await TestHelper.executePostCommand(SLIST_UPDATE, {

      "id": inputList.id,
      "members": [
        "0000-0000-2583-1534",
        "0000-0000-2589-1540"
      ],
      "shoppingItems": [
        {
          "id": "bf43de13d70a04506938d825175de5a2",
          "name": "kostky",
          "amount": 10,
          "unit": "kg",
          "active": true,
          "color": "green"
        },
        {
          "id": "40ff0e9935add46b7bccdf8019407832",
          "name": "Brokolice",
          "amount": 8,
          "unit": "kusů",
          "active": true,
          "color": "green"
        }
      ]
    });

    console.log("SLIST_CREATE-NO-MEMBERS", JSON.stringify({
      MEMBERS: inputList.members,
      ITEMS: inputList.shoppingItems
    }, null, 2));
    console.log("SLIST_UPDATE-ADD-TWO-MEMBERS", JSON.stringify({
      MEMBERS: response.members,
      ITEMS: response.shoppingItems
    }, null, 2));
    expect(response.members.length).toEqual(2);
    expect(response.shoppingItems.length).toEqual(2);
    expect(response.status).toEqual(200);
    expect(response.data.uuAppErrorMap).toEqual({});

  });

  test("A1 Warning unsupportedKeyList ", async () => {
    const dtoIn = {
      id: inputList.id,
      unknowAttribut: "ffff lisfft"
    };
    let result = await TestHelper.executePostCommand(SLIST_UPDATE, dtoIn);


    expect(result.data.name).toEqual('shopp1');
    expect(result.data.uuAppErrorMap).toMatchObject({
      "uu-jokes-main/slist/update/unsupportedKeys": {
        "message": "DtoIn contains unsupported keys.",
        "paramMap": {"unsupportedKeyList": ["$.unknowAttribut"]}, "type": "warning"
      }
    });


  });


  test("A2 - invalid dtoIn", async () => {
    const dtoIn = {};
    expect.assertions(3);
    try {
      await TestHelper.executePostCommand("slist/update", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uu-jokes-main/slist/update/invalidDtoIn");
      expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(1);
      expect(e.status).toEqual(400);
    }
  });

  test("A3 DocumentNotExist ", async () => {
    const dtoIn = {
      id: "6578ab61ef8e501b1480ecac",
    };
    expect.assertions(2);
    try {
      await TestHelper.executePostCommand(SLIST_UPDATE, dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uu-jokes-main/slist/update/documentNotExist");
      expect(e.status).toEqual(400);
    }


  });

  test("A4 UserNotAuthorizedEdit ", async () => {
    // delete owner_id cause that You are not allowed to update document.
    await TestHelper.executePostCommand(SLIST_UPDATE, {"id": inputList.id, "owner_id": "0-0" });

    const dtoIn = {
      "id": inputList.id,
      "name": "Nové jméno"
    };


    expect.assertions(2);
    try {
      await TestHelper.executePostCommand(SLIST_UPDATE, dtoIn);
    } catch (e) {

      expect(e.code).toEqual('uu-jokes-main/slist/update/userNotAuthorizedEdit');
      expect(e.status).toEqual(400);
    }


  });

  test("A5 NotEditPrivateAttributes ", async () => {
    // delete owner_id and add me to members  cause that You are not allowed to update document.
    // attribut name can update only owner of document not member.
    await TestHelper.executePostCommand(SLIST_UPDATE, {"id": inputList.id, "owner_id": "0-0", "members": ["3039-912-8064-0000"] });

    const dtoIn = {
      "id": inputList.id,
      "name": "Nové jméno A5 A5 NotEditPrivateAttributes"
    };


    expect.assertions(2);
    try {
      await TestHelper.executePostCommand(SLIST_UPDATE, dtoIn);
    } catch (e) {
      expect(e.code).toEqual('uu-jokes-main/slist/update/notEditPrivateAttributes');
      expect(e.status).toEqual(400);
    }


  });

});
