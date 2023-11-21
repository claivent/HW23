//@@viewOn:imports
import {createVisualComponent, useState, Utils, useScreenSize } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms, { Text } from "uu5g05-forms";


//@@viewOff:imports

//@@viewOn:constants

//@@viewOff:constants

//@@viewOn:css

const Css = {
  main: () => Config.Css.css({}),
  redText: () =>
    Config.Css.css({
      color: "red",
    }),
  ItemRed: () => Config.Css.css({
    margin: "2",

  }),

};
const Css2 = {
  container: (screenSize) => {
    let maxWidth;

    switch (screenSize) {
      case "xs":
      case "s":
        maxWidth = "100%";
        break;
      case "m":
      case "l":
        maxWidth = 640;
        break;
      case "xl":
      default:
        maxWidth = 1280;
    }

    return Config.Css.css({ maxWidth: maxWidth, margin: "0px auto", paddingLeft: 8, paddingRight: 8 });
  },

};

//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SItem",

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
    const[name, setName] = useState(props.product.name);
    const[amount, setAmount] = useState(props.product.amount);
    const[unit, setUnit] = useState(props.product.unit);
    //const[checked, setChecked] = useState(props.product.active);
    const checked = props.product.active
    //@@viewOn:interface
    //@@viewOff:interface


    function handleIsItemActive(id, checked){

      //setChecked(c);
      props.isItemActive(id,checked)

    }
    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    //const amountUnit = [props.product.amount, props.product.unit, props.product.name ]
   // const name = props.product.active ? amountUnit.join(' '):
     // <span style={{ color: 'red' }}>
      //{amountUnit.join(' ')}
    //</span>;


      console.log(props.product)
    return  (
          <Uu5Elements.ListItem

            {...attrs}
            icon="uugds-dnd" actionList={[

              { icon: "uugds-delete",  primary: true, onClick: props.onDelete },
            ]}

          >
            <Uu5Forms.Text.Input value = {name} onChange={(e)=> setName(e.data.value)} placeholder="Vlož jméno" significance="distinct" className={Css2.container(useScreenSize)}/>
            <Uu5Forms.Text.Input value = {amount} onChange={(e)=> setAmount(e.data.value)} placeholder="Množství" significance="distinct" className={Css2.container(useScreenSize)}/>
            <Uu5Forms.Text.Input value = {unit} onChange={(e)=> setUnit(e.data.value)} placeholder="Jednotka množství" significance="distinct" className={Css2.container(useScreenSize)}/>
            <Uu5Forms.Checkbox
              value={checked}
              box={checked} name="active"
              label="nakoupeno"
              onChange={(e)=>{handleIsItemActive(props.product.id, e.data.value  )}} className={Css2.container(useScreenSize)}
            >
            </Uu5Forms.Checkbox>
          </Uu5Elements.ListItem>
    )
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SItem };
export default SItem;
//@@viewOff:exports
