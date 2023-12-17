//@@viewOn:imports
import {createVisualComponent, Lsi, useContext, useRoute, useSession} from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
import {useSubAppData} from "uu_plus4u5g02";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
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
    console.log("Identity", identity);
    console.log("subAppDataObject", subAppDataObject);

    //@@viewOn:render
    return (

        <Plus4U5App.RouteBar appActionList={appActionList} {...props}>
          <Plus4U5App.RouteHeader title={"" + subAppDataObject.data.name + " / Přihlášený uživatel: " + identity.name + ", " + identity.uuIdentity} />
        </Plus4U5App.RouteBar>

    )


    //@@viewOff:render
  },
});

//@@viewOn:exports
export {RouteBar};
export default RouteBar;
//@@viewOff:exports
