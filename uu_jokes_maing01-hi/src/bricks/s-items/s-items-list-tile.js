//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
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

const SItemsListTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SItemsListTile",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { data, value } = props;
    const result = data[value] && typeof data[value] === "object" ? JSON.stringify(data[value]) : data[value];
    return result ?? null;



    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SItemsListTile);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div>Visual Component {SItemsListTile.uu5Tag}</div>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SItemsListTile };
export default SItemsListTile;
//@@viewOff:exports
