//@@viewOn:imports
import {createVisualComponent, Utils, Content, useSession} from "uu5g05";
import Config from "./config/config.js";
import { withRoute } from "uu_plus4u5g02-app";
import Tree from "../bricks/help/tree";
import RouteBar from "../core/route-bar.js";
import MainBox from "../bricks/slist/main-box";
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

let Slist = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Slist",

  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    console.log("SLISTS-ROUTE", props);
    //@@viewOn:private
    const { identity } = useSession();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());






    return(
      <div {...attrs}>

          <RouteBar />
          <MainBox initialProducts={PRODUCTS} initialList={SHOPPING_LISTS[0]} />;



      </div>
    ) ;
    //@@viewOff:render
  },
});
const SHOPPING_LISTS = [
  {id: Utils.String.generateId(), name: "Páteční nákup",  archive: false, childId:[156, 142, 186]}
];
const PRODUCTS = [
  {id: Utils.String.generateId(), name: "Apple", amount: 5, unit: "Kg", active: false},
  {id: Utils.String.generateId(), name: "Car",  amount: 4, unit: "pieces", active: false},
  {id: Utils.String.generateId(), name: "Knife",  amount: 5, unit: "pieces", active: false },
  {id: Utils.String.generateId(), name: "Orange",  amount: 10, unit: "Stock", active: true },
  {id: Utils.String.generateId(), name: "Pumpkin",  amount: 4, unit: "Stock", active: false },
  {id: Utils.String.generateId(), name: "Peas",  amount: 5, unit: "Kg", active: true }
];

Slist = withRoute(Slist, { authenticated: false }); //TODO return back to true



//@@viewOn:exports
export { Slist };
export default Slist;
//@@viewOff:exports
