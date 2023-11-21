//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Config from "./config/config.js";
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

const Footbar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Footbar",

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


    return (
      <div {...attrs}>




      </div>
    )
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Footbar };
export default Footbar;
//@@viewOff:exports
