//@@viewOn:imports
import {createComponent, Utils} from "uu5g05";
import Config from "./config/config.js";
import Uu5TilesControls from "uu5tilesg02-controls";
import {useDataListContext} from "../../core/providers/data-list-context";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const SlistsFilterBar = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SlistsFilterBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const datalist =  useDataListContext();
    //console.log("SLISTS-FILTER-BAR-datalist", datalist);
    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
        <>
        <Uu5TilesControls.FilterBar initialExpanded={true} displayManagerButton={false} displayClearButton={false}/>
          <Uu5TilesControls.FilterManagerModal/>
        </>
    )
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SlistsFilterBar };
export default SlistsFilterBar;
//@@viewOff:exports
