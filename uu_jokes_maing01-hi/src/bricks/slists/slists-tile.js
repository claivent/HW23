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
    props.data.handlerMap.delete;



    return  (
      <>

      <Uu5TilesElements.Tile
        header={props.data.data.name}
        actionList={[{icon: "uugds-close", children: "Smazat", onClick: () => setDeleteOpen(true) }]}
      >
        {props.data.data.notes}
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
