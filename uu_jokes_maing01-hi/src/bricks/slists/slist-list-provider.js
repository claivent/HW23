//@@viewOn:imports
import { createComponent, useDataList, useDataObject, useEffect, useState } from "uu5g05";
import Config from "./config/config.js";
import SlistsListView from "./slists-list-view";
import {useDataListContext} from "../../core/providers/data-list-context";


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
    const datalist = useDataListContext();
    const [data, setData] = useState(datalist.DATA.data);
    console.log("SLISTS-LIST-PROVIDER-PROPS", props);
    console.log("SLISTS-LIST-PROVIDER-DATALIST", datalist);
    console.log("SLISTS-LIST-PROVIDER-STATE-DATA", data);
    //@@viewOn:private
    const { children } = props;

    function handleDrop(e){
      setData(e);
      return console.log("TODO-FUNCTIONHANDLEDROP", e);

    }



    return(
        <SlistsListView drop={handleDrop} setData={datalist.DATA.data}/>
    );


  },
});

//@@viewOn:exports
export { SlistsListProvider };
export default SlistsListProvider;
//@@viewOff:exports
