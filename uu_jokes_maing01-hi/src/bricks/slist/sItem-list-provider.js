//@@viewOn:imports
import { createComponent, useDataList, useDataObject, useEffect, useState } from "uu5g05";
import { useSubAppData, useSystemData } from "uu_plus4u5g02";
import Config from "./config/config.js";


import Uu5Elements from "uu5g05-elements";
import Calls from "calls";
import MainBox from "./main-box";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const SItemListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SItemListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    console.log("SITEMS-PROVIDER", props);
    //@@viewOn:private
    const { children } = props;
    const[createOpen, setCreateOpen] = useState(false);
    const[deleted, setDeleted] = useState(false);
    const[datalistState, setDatalistState] = useState("");
    console.log("100deleted",deleted);
    console.log("110datalistState",datalistState);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface


    /*let sysDataObject =  useDataObject({
      handlerMap: {
        load: Calls.loadMokSys,
      },
    });
    let { state, data, errorData, pendingData, handlerMap } = sysDataObject;


    console.log("dataObject", sysDataObject);
    console.log("state", state);*/




    const dataList = useDataList({
      handlerMap: {
        load: handleDataListLoad,
        create: handleDataListCreate,

      },
      itemHandlerMap: {
        delete: handleDataListDelete,
        isArchive: handleUpdate
      }
    });
      console.log("320datalist", dataList);
     function handleDataListLoad() {
       console.log("340datalist");
      return  Calls.loadSlistsList();

    }

    console.log("datalist", dataList);
    function handleDataListCreate(data) {
      console.log("340datalist");
      return  Calls.createSlist(data);

    }
    async function handleDataListDelete(data) {
      console.log("handleDataListDelete",data);
      let result = await Calls.deleteSlist(data);
      console.log(result)
      dataList.handlerMap.load();
      return result;
    }

    async function handleUpdate(data) {
      console.log("handleSsArchive",data);
      let result = await Calls.updateSlist(data);
      console.log(result);
      dataList.handlerMap.load();
      return result;

    }





    //@@viewOn:render
    let result;

    switch (dataList.state){
      case "pendingNoData":
        result = <Uu5Elements.Pending size={"max"}/>
        break;

      case "errorNoData":
        result = <Uu5Elements.Alert header={ "Cannot create library."} priority={"error"}/>
        break;
      case "error":
        result = <Uu5Elements.Alert header={ "Data about libraries cannot be loaded."} priority={"error"}/>
        break;
      default:


        result = <MainBox
          data={dataList.data}
          setData={deleted}
          onCreate = {dataList.handlerMap.create}
          onDelete = {handleDataListDelete}
          onUpdates ={handleUpdate} />

        console.log("400READYFUNCTION", dataList.data);


        break;
    }


    return result;


  },
});

//@@viewOn:exports
export { SItemListProvider };
export default SItemListProvider;
//@@viewOff:exports
