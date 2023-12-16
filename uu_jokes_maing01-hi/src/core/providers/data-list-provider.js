//@@viewOn:imports
import {createComponent, useDataList, useDataObject} from "uu5g05";
import Config from "./config/config.js";
import Calls from "calls";
import ContextDataList from "./data-list-context";
import Uu5Elements from "uu5g05-elements";


//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const DataListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DataListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const {children} = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const slistsDataObject = useDataObject({
      handlerMap: {
        load: Calls.Slist.load,

      },
    });

    const slistDataList = useDataList({
      handlerMap: {
        load: handleDataListLoad,
        create: handleDataListCreate,
        update:handleUpdate,
      },
      itemHandlerMap: {
        delete: handleDataListDelete,
        isArchive: handleArchive
      }
    });


    function handleDataListLoad() {
      return Calls.loadSlistsList();
    }

    function handleDataListCreate(data) {
      return Calls.createSlist(data);
    }

    async function handleDataListDelete(data) {
      return await Calls.deleteSlist(data);
    }

    async function handleUpdate(data) {
      return await Calls.updateSlist(data);
    }
    async function handleArchive(data) {
      return await Calls.archiveSlist(data);
    }


    //@@viewOn:render
    let result;

    switch (slistDataList.state) {
      case "pendingNoData":
        result = <Uu5Elements.Pending size={"max"}/>
        break;
      case "errorNoData":
        result = <Uu5Elements.Alert header={"Cannot create library."} priority={"error"}/>
        break;
      case "error":
        result = <Uu5Elements.Alert header={"Data about libraries cannot be loaded."} priority={"error"}/>
        break;
      default:
        switch (slistsDataObject.state) {
          case "pendingNoData":
            result = <Uu5Elements.Pending size={"max"}/>
            break;
          case "errorNoData":
            result = <Uu5Elements.Alert header={"Cannot create library."} priority={"error"}/>
            break;
          case "error":
            result = <Uu5Elements.Alert header={"Data about libraries cannot be loaded."} priority={"error"}/>
            break;
          default:

            result =
              <ContextDataList.Provider value={{DATA:slistDataList, PDATA: slistsDataObject}}>
                {typeof props.children === "function" ? props.children({DATA:slistDataList, PDATA: slistsDataObject}) : props.children}
              </ContextDataList.Provider>
            break;
        }

        break;
    }
    return result;


    //@@viewOff:render
  },
});

//@@viewOn:exports

export default DataListProvider;
//@@viewOff:exports
