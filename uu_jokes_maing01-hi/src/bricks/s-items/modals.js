//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import Uu5Forms from "uu5g05-forms";
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

const Modals = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Modals",

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

console.log("Modals", props);
    return (
      <div {...attrs}>

        <Uu5Elements.Modal
          open={props.open}
          onClose={props.close}
          header="Create Shop Item"
          footer={
            <div>
              <Uu5Forms.CancelButton onClick= {props.onClick} />
              <Uu5Forms.SubmitButton  />
            </div>
          }
        >
          <Uu5Forms.FormText name="name" label = "Name"/>
          <Uu5Forms.FormText name="amount"   label = "Amount"/>
          <Uu5Forms.FormText name="unit"   label = "Unit"/>
        </Uu5Elements.Modal>





      </div>
    )
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Modals };
export default Modals;
//@@viewOff:exports
