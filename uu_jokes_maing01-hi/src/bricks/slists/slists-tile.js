//@@viewOn:imports
import {createVisualComponent, Lsi,  useRoute, useState, Utils} from "uu5g05";
import Config from "./config/config.js";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import importLsi from "../../lsi/import-lsi";


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

  display: (display) =>{
    const style = display === false ? {display: "none"}: {display: "block"}
    return Config.Css.css(style);
  },

};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers



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



    //console.log("TILEPROPS", props);
    //console.log("archive", props.data.data.isArchived);
    //@@viewOn:private
    //const { children } = props;
    const { data, ...otherProps } = props;
    const[deleteOpen, setDeleteOpen] = useState(false);

    console.log("otherprops", data);
    const [, setRoute] = useRoute();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const titleStyles = { category: "interface", segment: "title", type: "micro" };
    const fixedC = Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"]);
    const textStyles = (segment) => ({ category: "interface", segment, type: "medium" });

    props.data.handlerMap.delete;

    //
    function handleDeleteTile(sItem) {
      setDeleteOpen(false);
      return(sItem.handlerMap.delete({ "id": sItem.data.id }));
    }
    function handleIsArchived(sItem) {
      return(sItem.handlerMap.isArchive({ "id": sItem.data.id, isArchived: !props.data.data.isArchived }));
    }


    return  (
      <>

      <Uu5TilesElements.Tile
        {...otherProps}

        key ={data.data.id}
        className={Css.tile()}
        header={
          <Uu5Elements.Header className={Css.header()} title={data.data.name}  icon="uugds-favorites"/>
        }
        actionList={[
          { icon: "uugds-pencil", children: <Lsi import={importLsi} path={["Menu", "slist"]} />,
            onClick: () => setRoute("slist", { listId: data.data.id }) },
          {
          icon: "uugds-close", children: "Smazat", onClick: () => setDeleteOpen(true) },
          {icon: "uugdsstencil-uiaction-archive", children: "Archivovat", onClick: async () => {
            handleIsArchived({...data});}
          }
        ]}
      >
        <div key={"divNotes"}>
        <Uu5Elements.Text key={"notes"} {...titleStyles} >
         <Uu5Elements.Icon icon="uugds-favorites" className={Css.margin("right", fixedC)} />
          {data.data.notes}
        </Uu5Elements.Text>
        </div>
        <div key={"divOwner"} className={Css.marginTop()}>
        <Uu5Elements.Text key="owner" colorScheme="green">
          <Uu5Elements.Icon icon="uugds-favorites"  />
          {"  Vlastník: "}{data.data.owner_name}
        </Uu5Elements.Text>
      </div>
        <div key={"divMembers"} className={Css.italic()}>
          <Uu5Elements.Text key={"members"}{...textStyles("content")}  >
            {"Členové: "}({data.data.members ? props.members( data.data.members): "Not members"})
          </Uu5Elements.Text>
        </div>
          <div key={"divArchived"}>
            <Uu5Elements.Text key={"archived"} className={Css.display(data.data.isArchived)}  >
              {"Archived "}{data.data.isArchived}
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
            {children: "Smazat", colorScheme: "negative", significance: "highlighted",  onClick: async () => {
              await handleDeleteTile({...data});
            } },
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
