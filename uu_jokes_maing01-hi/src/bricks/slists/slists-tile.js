//@@viewOn:imports
import {BackgroundProvider, createComponent, createVisualComponent, Lsi, useRoute, useState, Utils} from "uu5g05";
import Config from "./config/config.js";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Uu5TilesControls from "uu5tilesg02-controls";
import importLsi from "../../lsi/import-lsi";


//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),

  header: () =>
    Config.Css.css({}),
  marginTop: () =>
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
      gap: 10,
    });
  },
  tile: () => Config.Css.css({padding: "5px", margin: 10}),

  italic: () => Config.Css.css({fontStyle: "italic", marginTop: 10}),
  margin: (side, size) => {
    const style = side === "left" ? {marginLeft: size} : {marginRight: size};
    return Config.Css.css(style);
  },
  controls: () =>
    Config.Css.css({
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      padding: 8,

    }),


  display: (display) => {
    const style = display === false ? {display: "none"} : {display: "block", paddingTop: 10}
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
    console.log("START-slists-tile");

    //console.log("TILEPROPS", props);
    //console.log("archive", props.data.data.isArchived);
    //@@viewOn:private
    //const { children } = props;
    const {data, selected, toggleSelected, dragElementRef, ...otherProps} = props;
    const [deleteOpen, setDeleteOpen] = useState(false);
    //console.log("propsTile", props);


    //console.log("otherprops", data);
    const [, setRoute] = useRoute();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const titleStyles = { category: "interface", segment: "title", type: "micro" };
    const textStyles = (segment) => ({ category: "interface", segment, type: "medium" });
    const fixedC = Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"]);


    props.data.handlerMap.delete;

    //
    function handleDeleteTile(sItem) {
      setDeleteOpen(false);
      return (sItem.handlerMap.delete({"id": sItem.data.id}));
    }

    async function handleIsArchived(sItem) {
      let result = {"id": sItem.data.id, isArchived: !props.data.data.isArchived};
      let result2 = await  sItem.handlerMap.isArchive(result);
      return (result2);
    }


    return (
      <>


        <Uu5TilesElements.Tile
          {...otherProps}
          borderRadius="elementary"
          significance={selected ? "distinct" : "common"}
          colorScheme={selected ? "green" : "building"}

          key={data.data.id}
          className={Css.tile()}
          header={
            <Uu5Elements.Header className={Css.header()} title={data.data.name} icon="uugds-favorites"/>
          }
          actionList={[
            {
              icon: "uugds-pencil", children: <Lsi import={importLsi} path={["SlistsTile", "detail"]}/>,
              onClick: () => setRoute("slist", {listId: data.data.id})
            },
            {
              icon: "uugds-close", children: <Lsi import={importLsi} path={["SlistsTile", "del"]}/>, onClick: () => setDeleteOpen(true)
            },
            {
              icon: "uugdsstencil-uiaction-archive", children: <Lsi import={importLsi} path={["SlistsTile", "arch"]}/>, onClick: async () => {
                await handleIsArchived({...props.data});
              }
            }
          ]}
        >
          {({padding}) => {
            return (
              <>
                <div className={Css.controls()}>
                  <Uu5Elements.Button colorScheme="green" elementRef={dragElementRef}>
                    <Lsi import={importLsi} path={["SlistsTile", "dragBtn"]}/>
                  </Uu5Elements.Button>
                  <Uu5Elements.Button
                    colorScheme="blue"
                    significance="distinct"
                    onClick={(e) => {
                      e.stopPropagation();
                      typeof toggleSelected === "function" ? toggleSelected() : undefined;
                    }}
                  >
                    <Lsi import={importLsi} path={["SlistsTile", "selectBtn"]}/>
                  </Uu5Elements.Button>
                </div>

                <div className={Css.layout(padding)}>
                  <Uu5Elements.Text {...titleStyles}>
                    <Uu5Elements.Icon icon="uugds-favorites" className={Css.margin("right", fixedC)}/>
                    <Lsi import={importLsi} path={["SlistsTile", "name"]}/>
                    {data.data.name}
                  </Uu5Elements.Text>

                </div>


                <div key={"divNotes"}>
                  <Uu5Elements.Text key={"notes"} {...textStyles("content")} >
                    <Uu5Elements.Icon icon="uugds-favorites" className={Css.margin("right", fixedC)}/>
                    <Lsi import={importLsi} path={["SlistsTile", "desc"]}/>
                    {data.data.notes}
                  </Uu5Elements.Text>
                </div>
                <div key={"divOwner"} className={Css.marginTop()}>
                  <Uu5Elements.Text {...textStyles("interactive")} className={Css.margin("left", fixedC)} key="owner" colorScheme="green">
                    <Uu5Elements.Icon icon="uugds-favorites"/>
                    <Lsi import={importLsi} path={["SlistsTile", "owner"]}/>
                    {data.data.owner_name}
                  </Uu5Elements.Text>
                </div>
                <div key={"divMembers"} className={Css.marginTop()}>
                  <Uu5Elements.Text key={"members"} {...textStyles("interactive")} className={Css.margin("left", fixedC)}  >
                    <Lsi import={importLsi} path={["SlistsTile", "member"]}/> ({data.data.members ? props.members(data.data.members) : "Not members"})
                  </Uu5Elements.Text>
                </div>
                <div key={"divArchived"}>
                  <Uu5Elements.Text key={"archived"} className={Css.display(props.data.data.isArchived)}>
                    <Lsi import={importLsi} path={["SlistsTile", "archived"]}/> {props.data.data.isArchived}
                  </Uu5Elements.Text>
                </div>

              </>
            );
          }
          }
        </Uu5TilesElements.Tile>
        <BackgroundProvider background="light">
        <Uu5Elements.Dialog
          open={deleteOpen}
          onCLose={() => setDeleteOpen(false)}
          header={ <Lsi import={importLsi} path={["SlistsView", "dialogMessage"]}/>}
          info={data.data.name}
          icon="uugds-delete"
          actionList={[
            {
              children:  <Lsi import={importLsi} path={["SlistsView", "dialogSubmit"]}/>, colorScheme: "negative", significance: "highlighted", onClick: async () => {
                await handleDeleteTile({...data});
              }
            },
            {children:  <Lsi import={importLsi} path={["SlistsView", "dialogCancel"]}/>, onClick: () => setDeleteOpen(false)},
          ]}
        />
          </BackgroundProvider>


      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export {SlistsTile};
export default SlistsTile;
//@@viewOff:exports
