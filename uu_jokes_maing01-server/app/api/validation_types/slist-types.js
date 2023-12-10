/* eslint-disable */

const slistUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(3, 100),
  notes: string(0, 4000),
  awid: hexa32Code(),
  owner_id: string(),
  owner_name: string(500),
  members: array(string(0,32)),
  shoppingItems: array(string(0,32)),
  isArchived: boolean()


});

const slistCreateDtoInType = shape({
  name: uu5String(3, 100).isRequired(),
  notes: string(3, 4000).isRequired()
});

const slistGetDtoInType = shape({
  id: id().isRequired()
});

const slistListDtoInType  = shape({
  sortBy: oneOf(["name", "notes"]),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});

const slistDeleteDtoInType = shape({
  id: id().isRequired()
});


