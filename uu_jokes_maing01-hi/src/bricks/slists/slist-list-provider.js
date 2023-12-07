//@@viewOn:imports
import { createComponent, useDataList, useDataObject, useEffect, useState } from "uu5g05";
import { useSubAppData, useSystemData } from "uu_plus4u5g02";
import Config from "./config/config.js";
import SlistsListView from "./slists-list-view";
import Uu5Elements from "uu5g05-elements";
import Calls from "calls";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const SlistsListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SlistsListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;


    const [dataList, setDataList] = useState({
      state: "pendingNoData",
      data: [],
      errorData: null,
      pendingData: null,
      handlerMap: {
        load: Calls.loadSlistsList,
        create: Calls.createSlist,
        // Add other handlers as needed
      },
      itemHandlerMap: {
        delete: Calls.deleteSlist
      }


    });
    console.log("Slists-provider-view-data", dataList) ;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface


    const dataListHook = useDataList({
      handlerMap: dataList.handlerMap,
      itemHandlerMap: dataList.itemHandlerMap,
      // Add other parameters as needed
    });


    useEffect(() => {
      // Set the initial data when dataList changes
      dataListHook.setData(dataList.data);
    }, [dataList.data]);




    //@@viewOn:render
    let result;
    switch (dataListHook.state) {
      case "pendingNoData":
        result = <Uu5Elements.Pending size={"max"} />;
        break;

      case "errorNoData":
        result = <Uu5Elements.Alert header={"Cannot create library."} priority={"error"} />;
        break;

      case "error":
        result = (
          <Uu5Elements.Alert header={"Data about libraries cannot be loaded."} priority={"error"} />
        );
        break;

      default:
        result = (
          <>
            {typeof children === "function" &&
              children({
                dataList: dataListHook,
                setDataList,
              })}

            {dataListHook.state === "ready" && (
              <SlistsListView data={dataListHook.data} onCreate={dataListHook.handlerMap.create} />
            )}
          </>
        );
    }

    const childProps = {
      dataList: dataListHook,
      setDataList,
    };

    return result;


  },
});

//@@viewOn:exports
export { SlistsListProvider };
export default SlistsListProvider;
//@@viewOff:exports
