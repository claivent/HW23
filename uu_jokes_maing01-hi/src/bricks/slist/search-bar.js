//@@viewOn:imports
import { createVisualComponent, Utils,useState } from "uu5g05";
import Config from "./config/config.js";
import Uu5Forms from "uu5g05-forms";

//@@viewOff:imports



//@@viewOn:constants

//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SearchBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SearchBar",
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

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());


    return  (


      <Uu5Forms.Form>
        <Uu5Forms.Checkbox
          label="Show only active items"
          value={props.isChecked}
          onChange={props.onShow}
          >
          </Uu5Forms.Checkbox>
      </Uu5Forms.Form>

    )
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SearchBar };
export default SearchBar;
//@@viewOff:exports
