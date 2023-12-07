//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState } from "uu5g05";
import Config from "./config/config.js";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import { useSlists} from "../../core/context-permission";


//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),


  header: () =>
    Config.Css.css({

    }),
  marginTop:() =>
    Config.Css.css({
        marginTop: 10
    }),
  layout: (padding, gap) => {
    let styles = {};
    if (padding) {
      styles = {
        paddingTop: padding.top,
        paddingRight: padding.right,
        paddingBottom: padding.bottom,
        paddingLeft: padding.left,
      };
    }
    return Config.Css.css({
      ...styles,
      display: "flex",
      flexDirection: "column",
      gap,
    });
  },
  tile: () => Config.Css.css({ padding: "5px", margin: 5 }),

  italic: () => Config.Css.css({ fontStyle: "italic", marginTop: 10 }),
  margin: (side, size) => {
    const style = side === "left" ? { marginLeft: size } : { marginRight: size };
    return Config.Css.css(style);
  },

};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

/*//testování autorizace
const slistsDataObject = useSlists();
const {sysData} = slistsDataObject.data;
const profileList =  sysData.profileData.uuIdentityProfileList;
const uuIdentity = sysData.profileData.uuIdentity;

function hasManagePermission(owner_id, uuIdentity, profileList) {
  const isAuthority = profileList.includes("Authorities");
  const isExecutive = profileList.includes("Executives");
  const isOwner = owner_id ===  uuIdentity;
  return isAuthority || (isExecutive && isOwner);
}

function  handleCanDelete(owner_id){
  const auth = hasManagePermission(owner_id, uuIdentity, profileList)
  console.log(auth);
  return auth;
}*/

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
    const { data, onDelete } = props;
    console.log( "slists-tile",props) ;
    const[deleteOpen, setDeleteOpen] = useState(false);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const titleStyles = { category: "interface", segment: "title", type: "micro" };
    const fixedC = Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"]);
    const textStyles = (segment) => ({ category: "interface", segment, type: "medium" });

    //props.data.handlerMap.delete;

    //
    async function handleDeleteTile() {
      setDeleteOpen(false);
      // Call the onDelete function passed as a prop
      await onDelete(data);
    }

    return  (
      <>

      <Uu5TilesElements.Tile  className={Css.tile()}
                              header={
                                <Uu5Elements.Header
                                  className={Css.header()}
                                  title={data.data.name}
                                  icon="uugds-favorites"

                                />  }

        actionList={[{icon: "uugds-close", children: "Smazat", onClick: () => setDeleteOpen(true) }]}
      >
        <div>
        <Uu5Elements.Text {...titleStyles} >
         <Uu5Elements.Icon icon="uugds-favorites" className={Css.margin("right", fixedC)} />
          {data.data.notes}
          {/*{handleCanDelete(.data.data.owner_id)}*/}
        </Uu5Elements.Text>
        </div>
        <div className={Css.marginTop()}>
        <Uu5Elements.Text >
          <Uu5Elements.Icon icon="uugds-favorites"  />
          {"Vlastník: "}{data.data.owner_name}
        </Uu5Elements.Text>
      </div>
        <div className={Css.italic()}>
        <Uu5Elements.Text{...textStyles("content")}  >
          {"Členové: "}({/*data.data.members.join(", ")*/})
        </Uu5Elements.Text>
        </div>
      </Uu5TilesElements.Tile>
        <Uu5Elements.Dialog
          open={deleteOpen}
          onCLose = {() => setDeleteOpen(false)}
          header  = "chcete smazat položku?"
          info = {data.data.name}
          icon ="uugds-delete"
          actionList={[
            {children: "Smazat", colorScheme: "negative", significance: "highlighted",  onClick: handleDeleteTile },
            {children: "Zrušit", onClick: () => setDeleteOpen(false)  },
          ]}
        />


      </>
    ) ;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SlistsTile };
export default SlistsTile;
//@@viewOff:exports
