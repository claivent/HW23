import SlistsListView from "../uu_jokes_maing01-hi/src/bricks/slists/slists-list-view";

<SlistsListView
  data={dataList.data}

  onCreate = {dataList.handlerMap.create}
  onDelete = {handleDataListDelete}
  onUpdates ={handleUpdate} />

console.log("400READYFUNCTION", dataList.data);
