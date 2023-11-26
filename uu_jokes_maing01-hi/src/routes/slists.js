//@@viewOn:imports
import {createVisualComponent, Utils, Content, useSession} from "uu5g05";
import { useSubAppData, useSystemData } from "uu_plus4u5g02";
import Config from "./config/config.js";
import { withRoute } from "uu_plus4u5g02-app";
import Tree from "../bricks/help/tree";
import RouteBar from "../core/route-bar.js";
import SlistsListProvider from "../bricks/slists/slist-list-provider";
import importLsi from "../lsi/import-lsi.js";


//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  l1: () =>
    Config.Css.css({
      fontSize: 48,
      lineHeight: "1em",
      display: "block",
      marginRight: "20px",
    }),
  l2: () =>
    Config.Css.css({
      fontSize: 48,
      lineHeight: "1em",
      display: "block",
      marginRight: "40px",
    }),
  l3: () =>
    Config.Css.css({
      fontSize: 48,
      lineHeight: "1em",
      display: "block",
      marginRight: "40px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Slists = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Slists",

  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    const { identity } = useSession();


    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());


    function ProductCategoryRow({ category }) {
      return (
        <tr>
          <th colSpan="2">
            {category}
          </th>
        </tr>
      );
    }



    return(
      <div {...attrs}>

          <RouteBar />
        <SlistsListProvider />



      </div>
    ) ;
    //@@viewOff:render
  },
});


Slists = withRoute(Slists, { authenticated: false }); //TODO return back to true



//@@viewOn:exports
export { Slists };
export default Slists;
//@@viewOff:exports
