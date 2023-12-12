//@@viewOn:imports
import {createVisualComponent, Utils, Content, useState} from "uu5g05";
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


    const[row, setRow] = useState(props.dataRow);
    //@@viewOff:private
    if(!row){
      setRow(props.dataRow);
    }

    console.log("state", row);

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
      const formData = props.dataRow;
console.log("ModalsTile", props);
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
          <Uu5Forms.Text name="name" value={props.dataRow.name} placeholder="Vlož jméno Produktu" label = "Name"/>
          <Uu5Forms.FormText name="amount" initialValue={"list.name"}   placeholder="Vlož množství produktu"    label = "Amount"/>
          <Uu5Forms.FormText name="unit" initialValue={"list.name"}    placeholder="Vlož jednotku (kg, bal, ks)"  label = "Unit"/>
        </Uu5Elements.Modal>





      </div>
    )
    console.log("dddddddddddd",row);
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Modals };
export default Modals;
//@@viewOff:exports
