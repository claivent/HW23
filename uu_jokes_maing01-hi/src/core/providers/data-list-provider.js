//@@viewOn:imports
import {createComponent, useDataList, useDataObject, useState} from "uu5g05";
import Config from "./config/config.js";
import Calls from "calls";
import ContextDataList from "./data-list-context";
import Uu5Elements from "uu5g05-elements";
import DarkModeToggle from "../dark-mode-toogle";


//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const DataListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ImplementedDataListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    console.log("START-data-list-provider");

    const [slist, setSlist] = useState({});
    //@@viewOn:private
    const {children} = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const UsersDataList = useDataList({
      handlerMap: {
        load: Calls.Users.load,

      },
    });

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
        changePosition: handlePosition,
      },
      itemHandlerMap: {
        delete: handleDataListDelete,
        isArchive: handleArchive
      }
    });

    async function handlePosition(data){
      return await Calls.deleteSlist(data);
    }
    async function handleDataListLoad() {
      return await Calls.loadSlistsList();
    }

    async function handleDataListCreate(data) {
      return await Calls.createSlist(data);
    }

    async function handleDataListDelete(data) {
      return await Calls.deleteSlist(data);
    }

    async function handleUpdate(data) {
      let result = await Calls.updateSlist(data)
      await setSlist(result.shoppingItems);
      return result;
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

            switch (UsersDataList.state) {
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


            result =(
              <>


              <ContextDataList.Provider value={{DATA:slistDataList, PDATA: slistsDataObject, UData:UsersDataList}}>

                {typeof props.children === "function" ? props.children({DATA:slistDataList, PDATA: slistsDataObject, UData:UsersDataList}) : props.children}
              </ContextDataList.Provider>
              </>
              )
                break;
            }

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
