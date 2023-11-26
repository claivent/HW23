//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState } from "uu5g05";
import Config from "./config/config.js";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),


  header: () =>
    Config.Css.css({

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

  italic: () => Config.Css.css({ fontStyle: "italic" }),
  margin: (side, size) => {
    const style = side === "left" ? { marginLeft: size } : { marginRight: size };
    return Config.Css.css(style);
  },
  image: (isModal) =>
    Config.Css.css({
      width: "100%",
      height: isModal ? 400 : 120,
      display: "block",
      objectFit: "cover",
    }),
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
    //@@viewOn:private
    const { children } = props;
    const[deleteOpen, setDeleteOpen] = useState(false);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const titleStyles = { category: "interface", segment: "title", type: "micro" };
    const fixedC = Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"]);
    const textStyles = (segment) => ({ category: "interface", segment, type: "medium" });

    props.data.handlerMap.delete;



    return  (
      <>

      <Uu5TilesElements.Tile  className={Css.tile()}
                              header={

                                <Uu5Elements.Header

                                  className={Css.header()}
                                  title={props.data.data.name}
                                  icon="uugds-favorites"
                                  // onIconClick={() => alert("click")}
                                />  }

        actionList={[{icon: "uugds-close", children: "Smazat", onClick: () => setDeleteOpen(true) }]}
      >
        <div>
        <Uu5Elements.Text {...titleStyles} >
         <Uu5Elements.Icon icon="uugds-favorites" className={Css.margin("right", fixedC)} />
          {props.data.data.notes}
        </Uu5Elements.Text>
        </div>
        <div>
        <Uu5Elements.Text {...titleStyles} >
          <Uu5Elements.Icon icon="uugds-favorites" className={Css.margin("right", fixedC)} />
          {"Vlastník: "}{props.data.data.owner_name}
        </Uu5Elements.Text>
      </div>
        <div>
        <Uu5Elements.Text {...textStyles("content")} className={Css.italic()}>
          {"Členové: "}({props.data.data.members.join(", ")})
        </Uu5Elements.Text>
        </div>
      </Uu5TilesElements.Tile>
        <Uu5Elements.Dialog
          open={deleteOpen}
          onCLose = {() => setDeleteOpen(false)}
          header  = "chcete smazat položku?"
          info = {props.data.data.name}
          icon ="uugds-delete"
          actionList={[
            {children: "Smazat", colorScheme: "negative", significance: "highlighted",  onClick: () => props.data.handlerMap.delete()  },
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
