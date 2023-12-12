<>
  <Uu5Tiles.ControllerProvider
    data={datalist.data}

    /*filterDefinitionList={FILTER_DEFINITION_LIST}
    filterList={archiveFilterList}
    onFilterChange={(e) => {
      setArchiveFilterList(e.data.filterList)
    }}*/ //TODO filtr
  >

    <h4>default</h4>
    <Uu5TilesElements.List data={DATA}/>

    <h4>columnList</h4>
    <Uu5TilesElements.List data={DATA} columnList={COLUMN_LIST}/>

  </Uu5Tiles.ControllerProvider>
</>

"shoppingItems" : [
  {
    "name" : "Apple",
    "amount" : NumberInt(5),
    "unit" : "Kg",
    "active" : false
  },
  {
    "name" : "Car",
    "amount" : NumberInt(4),
    "unit" : "pieces",
    "active" : false
  },
  {
    "name" : "Knife",
    "amount" : NumberInt(5),
    "unit" : "pieces",
    "active" : false
  },
  {
    "name" : "Orange",
    "amount" : NumberInt(10),
    "unit" : "Stock",
    "active" : true
  },
  {
    "name" : "Pumpkin",
    "amount" : NumberInt(4),
    "unit" : "Stock",
    "active" : false
  },
  {
    "name" : "Peas",
    "amount" : NumberInt(5),
    "unit" : "Kg",
    "active" : true
  }
],
