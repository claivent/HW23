//@@viewOn:imports
import { createVisualComponent, Utils, useState } from "uu5g05";
import Config from "./config/config.js";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import SlistsTile from "./slists-tile";
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
      padding: 16,
      height: 48,
    }),

  content: (image) =>
    Config.Css.css({
      display: "flex",
      alignItems: image ? "center" : "left",
      justifyContent: image ? "center" : "flex-start",
      height: "calc(100% - 48px - 48px)",
      overflow: "hidden",
    }),

  grid: ()=>
    Config.Css.css({
      marginLeft: 3,
      marginRight: 3,
      marginTop: 10,
    }),

  text: () =>
    Config.Css.css({
      display: "block",
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 16,
    }),

  image: () => Config.Css.css({ width: "100%" }),

  footer: () =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 48,
      marginTop: 8,
      paddingLeft: 16,
      paddingRight: 8,
    }),

  infoLine: () =>
    Config.Css.css({
      display: "block",
      marginLeft: 16,
      marginTop: 8,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SlistsListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SlistsListView",

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
    const[createOpen, setCreateOpen] = useState(false);

    console.log("SlistListVies", props);

    return  (
      <>
        <Uu5Elements.Block className={Css.main()}
                           header={
                             <Uu5Elements.Header
                               title="Nákupní seznamy"
                               subtitle="Pro vás"
                               icon="uugds-favorites"
                               // onIconClick={() => alert("click")}
                             />  }

          actionList={[
            {icon: "uugdsstencil-uiaction-plus-circle-solid", children: "vytvořit", onClick: ()=> setCreateOpen(true)}
          ]}
        >
          <Uu5TilesElements.Grid
            data={props.data}
            tileMinWidth = {300}
            tileMaxWidth = {400}
          >

            <SlistsTile />


          </Uu5TilesElements.Grid>
          <Uu5Forms.Form.Provider key={createOpen} onSubmit={async (e) => {
            await props.onCreate({id: Utils.String.generateId(), ...e.data.value});
            setCreateOpen (false);
            console.log("submit", e.data);
          }}>
            <Uu5Elements.Modal open={createOpen} onClose={() => {setCreateOpen(false)}} header={"Vytvořit seznam"} footer={<Uu5Forms.SubmitButton/>}>
              <Uu5Forms.Form.View gridLayout={{xs:"name, notes", s:"name notes"}}>
                <Uu5Forms.FormText name={"name"} label = "Name" required/>
                <Uu5Forms.FormText name={"notes"} label = "Notes" />
              </Uu5Forms.Form.View>
            </Uu5Elements.Modal>
          </Uu5Forms.Form.Provider>
        </Uu5Elements.Block>

      </>
    ) ;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SlistsListView };
export default SlistsListView;
//@@viewOff:exports
