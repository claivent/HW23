//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import Uu5TilesElements from "uu5tilesg02-elements";
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

const SlistsTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SlistsTile",

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
    props.data.handlerMap.delete;



    return  (

      <Uu5TilesElements.Tile
        header={props.data.data.name}

        actionList={[{icon: "uugds-close", children: "Smazat", onClick: ()=> props.data.handlerMap.delete()}]}
      >
        ...
      </Uu5TilesElements.Tile>

    ) ;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SlistsTile };
export default SlistsTile;
//@@viewOff:exports
