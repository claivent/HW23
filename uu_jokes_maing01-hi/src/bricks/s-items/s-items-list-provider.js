//@@viewOn:imports
import {createComponent, useRoute} from "uu5g05";
import Config from "./config/config.js";
import DataListProvider from "../../core/providers/data-list-provider";
import SItemsListView from "./s-items-list-view";
import {useDataListContext} from "../../core/providers/data-list-context";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const SItemsListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SItemsListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {


    const [route, setRoute] = useRoute();
    const {listId} = route.params;
    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return(
      <DataListProvider >
        <SItemsListView listId={listId}/>
      </DataListProvider>

    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SItemsListProvider };
export default SItemsListProvider;
//@@viewOff:exports
