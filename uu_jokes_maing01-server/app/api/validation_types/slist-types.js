/* eslint-disable */

const slistUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(3, 100),
  notes: string(0, 4000),
  awid: hexa32Code(),
  owner_id: string(),
  owner_name: string(500),
  members: array(string(0,32)),
  shoppingItems: array(shape({
    id: string(),
    name: string(3, 100),
    amount: number(),
    unit: string(0,100),
    active: boolean(),
    color: string() || null
  })),
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
  }),
  projection: shape({
    _uuIdentity: number(),
    _name: number()
  }),
  filter: shape({
    _uuIdentity: shape({
      $in: array(),
    }),
  }),

});

const slistDeleteDtoInType = shape({
  id: id().isRequired()
});

const slistArchiveDtoInType = shape({
  id: id().isRequired(),
  isArchived: boolean().isRequired()
});



