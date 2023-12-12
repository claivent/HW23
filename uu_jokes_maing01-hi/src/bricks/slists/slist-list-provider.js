//@@viewOn:imports
import { createComponent, useDataList, useDataObject, useEffect, useState } from "uu5g05";
import Config from "./config/config.js";
import SlistsListView from "./slists-list-view";
import DataListProvider from "../../core/providers/data-list-provider";


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
    console.log("SLISTS-PROVIDER", props);
    //@@viewOn:private
    const { children } = props;



    return(
      <DataListProvider>
        <SlistsListView/>
      </DataListProvider>

    );


  },
});

//@@viewOn:exports
export { SlistsListProvider };
export default SlistsListProvider;
//@@viewOff:exports
