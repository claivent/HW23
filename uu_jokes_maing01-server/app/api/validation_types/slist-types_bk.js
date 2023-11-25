/* eslint-disable */

const slistCreateDtoInType = shape({
  name: uu5String(3, 100).isRequired(),
  notes: string(10, 4000).isRequired()
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

const slistUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(3, 100).isRequired(),
  notes: string(0, 4000).isRequired()
});
