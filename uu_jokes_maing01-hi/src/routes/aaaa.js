//@@viewOn:imports
import { createVisualComponent, Utils, Content, useSession, useContext } from "uu5g05";
import { useSubAppData, useSystemData } from "uu_plus4u5g02";
import Config from "./config/config.js";
import { withRoute } from "uu_plus4u5g02-app";

import SlistList from "../core/slist/list";

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

let Aaaa = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Aaaa",

  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    console.log("AAAA", props);


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



          <SlistList />




      </div>
    ) ;
    //@@viewOff:render
  },
});


Aaaa = withRoute(Aaaa, { authenticated: false }); //TODO return back to true



//@@viewOn:exports
export { Aaaa };
export default Aaaa;
//@@viewOff:exports
