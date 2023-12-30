//@@viewOn:imports
import {AppBackgroundProvider, createVisualComponent, Lsi, useRoute, useSession} from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
import {useSubAppData} from "uu_plus4u5g02";
import DarkModeToggle from "./dark-mode-toogle";
const { UuGds } = require("uu5g05-elements");
import {Header} from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      height: "90%",
      maxWidth: "90%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "50px"

    }),

  header: () =>
    Config.Css.css({
      display: "block",
      textAlign: "left",
      padding: 16,
      height: 46,
    }),

block: () =>
  Config.Css.css({
    display: "block",
    textAlign: "left",
    padding: 16,
    height: 48,
  }),
}

//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const RouteBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RouteBar",

  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    console.log("UUGDS",UuGds);
    //@@viewOn:private
    const [, setRoute] = useRoute();
    const subAppDataObject = useSubAppData();
    const {identity} = useSession();

    const appActionList = [
      {children: <Lsi import={importLsi} path={["Menu", "home"]}/>, onClick: () => setRoute("home")},
      /*{ children: <Lsi import={importLsi} path={["Menu", "slist"]} />, onClick: () => setRoute("slist") },*/
      {children: <Lsi import={importLsi} path={["Menu", "slists"]}/>, onClick: () => setRoute("slists")},
      {
        children: <Lsi import={importLsi} path={["Menu", "about"]}/>,
        onClick: () => setRoute("about"),
        collapsed: true,
      },
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface
    //console.log("Identity", identity);
    //console.log("subAppDataObject", subAppDataObject);

    //@@viewOn:render
    return (
      <>


        <Plus4U5App.RouteBar appActionList={appActionList} {...props}>

          <Plus4U5App.RouteHeader   />
        </Plus4U5App.RouteBar>

        <DarkModeToggle />
          <Header
            className={Css.header()}
            /*title={" " + subAppDataObject.data.name + " / Přihlášený uživatel: " + identity.name + ", " + identity.uuIdentity}*/
          />






      </>
    )


    //@@viewOff:render
  },
});

//@@viewOn:exports
export {RouteBar};
export default RouteBar;
//@@viewOff:exports
