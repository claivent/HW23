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
    const[name, setName] = useState(props.dataRow ? props.dataRow.name:null);
    const[amount, setAmount] = useState(props.dataRow ? props.dataRow.amount:null);
    const[unit, setUnit] = useState(props.dataRow ? props.dataRow.unit:null);




    //@@viewOff:private




    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

// console.log("ModalsTile", props);
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
          <Uu5Forms.FormText name="id"
                             initialValue={props.dataRow ? props.dataRow.id:null}   placeholder="Vlož jméno Produktu" label = "Name" disabled={true}/>
          <Uu5Forms.FormText name="color"
                             initialValue={props.dataRow ? props.dataRow.color:null}  placeholder="Neaktivní" label = "Name" disabled={true}/>

          <Uu5Forms.FormText name="name"
                         initialValue={name} onChange={(e)=> setName(e.data.value)}  placeholder="Vlož jméno Produktu" label = "Name"/>
          <Uu5Forms.FormText name="amount"
                             initialValue={amount}  onChange={(e)=> setAmount(e.data.value)}   placeholder="Vlož množství produktu"    label = "Amount"/>
          <Uu5Forms.FormText name="unit"
                             initialValue={unit} onChange={(e)=> setUnit(e.data.value)}     placeholder="Vlož jednotku (kg, bal, ks)"  label = "Unit"/>

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
