/* eslint-disable */


const sitemCreateDtoInType = shape({
  name: uu5String(3, 100).isRequired(),
  cat: array(uu5String(3, 255), 0, 50).isRequired(),
  isDbArchived: boolean().isRequired()
});

const sitemGetDtoInType = shape({
  id: id().isRequired()

});

const sitemListDtoInType  = shape({
  sortBy: oneOf(["name"]),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});

const sitemDeleteDtoInType = shape({
  id: id().isRequired()
});

const sitemUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(3, 100).isRequired(),
  cat: array(uu5String(3, 255), 0, 50).isRequired(),
  isDbArchived: boolean().isRequired()
});
