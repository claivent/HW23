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

    const { children } = props;
    const DATA = {...props.dataRow};

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
     // console.log("Atributy",attrs)
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
                             initialValue={DATA ? DATA.id:""}   placeholder="id" label = "id" disabled={true} />
          <Uu5Forms.FormText name="color"
                             initialValue={DATA ? DATA.color:undefined}  placeholder="Neaktivní" label = "color" disabled={true} />
          <Uu5Forms.FormText name="name"
                             initialValue={DATA? DATA.name:""} minLength={3} maxLength={100} placeholder="Vlož jméno Produktu" label = "Name" required ={true}/>
          <Uu5Forms.FormNumber name="amount"
                               initialValue={DATA ? DATA.amount:0} placeholder="Vlož množství produktu" label = "Amount" required = {true} />
          <Uu5Forms.FormText name="unit"
                             initialValue={DATA? DATA.unit:""} minLength={2}  maxLength={100} placeholder="Vlož jednotku (kg, bal, ks)"  label = "Unit" required ={true} />
          <Uu5Forms.FormCheckbox name="active"
                             initialValue={DATA ? DATA.active:true} label="Zakoupeno" />
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
