//@@viewOn:imports
import { createVisualComponent, Utils, useSession, Environment } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5 from "uu_plus4u5g02";
import Plus4U5App, { SpaPending, Error } from "uu_plus4u5g02-app";
import { Unauthenticated } from "uu_plus4u5g02-elements";

import RouteBar from "./route-bar";

import Config from "./config/config.js";
import Home from "../routes/home.js";
import Slist from "../routes/slist";
import Slists from "../routes/slists";
import ProviderPermission from "./provider-permission";
import DataListProvider from "./providers/data-list-provider";

//@@viewOff:imports

//@@viewOn:constants
const About = Utils.Component.lazy(() => import("../routes/about.js"));
const InitAppWorkspace = Utils.Component.lazy(() => import("../routes/init-app-workspace.js"));
const ControlPanel = Utils.Component.lazy(() => import("../routes/control-panel.js"));

const ROUTE_MAP = {
  "": { redirect: "home" },
  home: (props) => <Home {...props} />,
  slist: (props) => <Slist {...props} />,
  slists: (props) => <Slists {...props} />,
  about: (props) => <About {...props} />,
  "sys/uuAppWorkspace/initUve": (props) => <InitAppWorkspace {...props} />,
  controlPanel: (props) => <ControlPanel {...props} />,
  "*": () => (
    <Uu5Elements.Text category="story" segment="heading" type="h1">
      Not Found
    </Uu5Elements.Text>
  ),
};

//@@viewOff:constants

function SessionResolver({ children }) {
  const session = useSession();

  switch (session.state) {
    case "pending":
      return <SpaPending/>;
    case "notAuthenticated":
      return <Unauthenticated/>;
    case "authenticated":
    default:
      return children;
  }
}

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Spa = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Spa",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (

      <Plus4U5.SpaProvider initialLanguageList={["en", "cs"]} baseUri={Environment.get("callsBaseUri")}>
        <Uu5Elements.ModalBus>





                  <DataListProvider>


                  {/*{(slistsDataObject) => (
                    <>
                      {slistsDataObject.DATA.state === "pendingNoData" && <SpaPending/>}
                      {slistsDataObject.DATA.state === "errorNoData" && <Error error={slistsDataObject.DATA.errorData}/>}
                      {["ready", "pending", "error"].includes(slistsDataObject.DATA.state) && (
                        <>
                          <RouteBar />
                          <Plus4U5App.Spa routeMap={ROUTE_MAP}/>
                        </>

                      )}
                    </>
                  )}*/}
                    <Plus4U5App.Spa routeMap={ROUTE_MAP}/>

                  </DataListProvider>





        </Uu5Elements.ModalBus>
      </Plus4U5.SpaProvider>

    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Spa };
export default Spa;
//@@viewOff:exports
