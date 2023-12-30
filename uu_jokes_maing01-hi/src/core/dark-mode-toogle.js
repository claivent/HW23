import {createVisualComponent, Lsi, useAppBackground} from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import ContextPermission from "./context-permission";
import importLsi from "../lsi/import-lsi";


const DarkModeToggle = createVisualComponent({
  uu5Tag: "Uu5Demo.DarkModeToggle",

  render(props) {
    const [background, setBackground] = useAppBackground();
    const darkMode = background === "dark";

    return (
      <Uu5Elements.Toggle
        label = {<Lsi import={importLsi} path={["DarkMode", "switch"]}/>}
        value={!darkMode}
        onChange={() => setBackground({
          backgroundColor: darkMode ? null : Uu5Elements.UuGds.ColorPalette.getValue(["building", "dark", "main"])
        })}
        iconOff="uugdsstencil-weather-moon"
        iconOn="uugdsstencil-weather-sun"
      />
    )
  }
});

export default DarkModeToggle;
