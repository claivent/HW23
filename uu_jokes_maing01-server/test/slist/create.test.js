const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("uuCmd slist/create", () => {
  test("HDS", async () => {
    const dtoIn = {
      name: "shopping list",
      notes: "I am  planning buying some food",
    };
    const result = await TestHelper.executePostCommand("slist/create", dtoIn);
    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.notes).toEqual(dtoIn.notes);

    //expect(result.data.awid).toEqual(TestHelper.awid);
    expect(result.data.uuAppErrorMap).toEqual({});
  });

  test("A1 warning unsupportedKeyList ", async () => {
    const dtoIn = {
      name: "shopping list",
      notes: "I am  planning buying some food",
      unknowAttribut: "ffff lisfft"
    };
     let result =  await TestHelper.executePostCommand("slist/create", dtoIn);

    expect(result.data.uuAppErrorMap).toMatchObject({
      "uu-jokes-main/slist/create/unsupportedKeys": {
        "message": "DtoIn contains unsupported keys.",
        "paramMap": {"unsupportedKeyList": ["$.unknowAttribut"]}, "type": "warning"
      }});


  });

  test("A2 - invalid dtoIn", async () => {
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
