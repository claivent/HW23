//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g05";
import Calls from "calls";
import Config from "./config/config";
import ContextPermission   from "./context-permission";
import Uu5Elements from "uu5g05-elements";
import ContextDataList from "./providers/data-list-context";
//@@viewOff:imports

export const ProviderPermission = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ProviderPermission",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const slistsDataObject = useDataObject({
      handlerMap: {
        load: Calls.Slist.load,

      },
    });
  console.log("PROVIDER-PERMISION",slistsDataObject)
    const providedData = slistsDataObject;
    let result;

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
        result = null;

        break;
    }
    return result;



    //@@viewOff:render
  },
});

export default ProviderPermission;
