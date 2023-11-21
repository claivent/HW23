//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

const Css = {
  main: () => Config.Css.css({}),
  ul1: () =>
    Config.Css.css({
      fontSize: 30,
      lineHeight: "1em",
      display: "block",
    }),
  l1: () =>
    Config.Css.css({
      marginLeft: "10px",
    }),
  l2: () =>
    Config.Css.css({
      marginLeft: "40px",
    }),
  l3: () =>
    Config.Css.css({
      marginLeft: "40px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOff:css
const Tree = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tree",
  nestingLevel: ["areaCollection", "area"],
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, Tree);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div>Visual Component {Tree.uu5Tag}</div>
        <Content nestingLevel={currentNestingLevel}>{children}

          <ul className={Css.ul1() + ' ' + Css.l1()} > MainBox
            <ul className={Css.l2()}>TopBar
              <li>SearchBar</li>
            </ul>
            <ul className={Css.l2()}>SListBar (list of lists)
              <li>CategoryRow</li>
              <li>Item (list)</li>
              <li>SBtnBox</li>


              <ul className={Css.l3()}>SListBar   (list of Items)
                <li>CategoryRow</li>
                <li>Item (list)</li>
                <li>SBtnBox</li>
              </ul >

            </ul>
            <ul className={Css.l2()}>Footbar
              <li>RouteBar</li>
            </ul>
          </ul>

        </Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Tree };
export default Tree;
//@@viewOff:exports
