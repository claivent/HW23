//@@viewOn:imports
import { createComponent, useDataList } from "uu5g05";
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface
    const dataList = useDataList({
      handlerMap: {
        load: Calls.loadSlistsList,
        create: Calls.createSlist,

      },
      itemHandlerMap: {
        delete: Calls.deleteSlist
      }
    });
    console.log("dataList", dataList);


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


        result = <SlistsListView data={dataList.data} onCreate = {dataList.handlerMap.create} />
        break;
    }

    return result;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SlistsListProvider };
export default SlistsListProvider;
//@@viewOff:exports
