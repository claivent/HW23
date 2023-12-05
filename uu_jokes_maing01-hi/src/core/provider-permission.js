//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g05";
import Calls from "calls";
import Config from "./config/config";
import ContextPermission   from "./context-permission";
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
        load: Calls.Slists.load,
      },
    });


    //@@viewOff:private

    //@@viewOn:render
    return (
      <ContextPermission.Provider value={slistsDataObject}>
        {typeof props.children === "function" ? props.children(slistsDataObject) : props.children}
      </ContextPermission.Provider>
    );
    //@@viewOff:render
  },
});

export default ProviderPermission;
