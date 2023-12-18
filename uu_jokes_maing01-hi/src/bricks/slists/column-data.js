//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const ColumnData = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ColumnData",
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
    const { data, value } = props;
    const result = data[value] && typeof data[value] === "object" ? JSON.stringify(data[value]) : data[value];

    const SERIE_LIST = [
      {
        value: "name",
        label: { cs: "Název", en: "Name" },
        dataItem: (data) => <ColumnData value="name" data={data.data} />,
      },
      {
        value: "notes",
        label: { cs: "Poznámky", en: "Notes" },
        dataItem: (data) => <ColumnData value="notes" data={data.data} />,
      },
      {
        value: "owner_name",
        label: { cs: "Vlastník", en: "Owner" },
        dataItem: (data) => <ColumnData value="owner_name" data={data.data} />,
      },
      {
        value: "members",
        label: { cs: "Členové", en: "Members" },
        dataItem: (data) => <ColumnData value="members" data={data.data} />,
      },
      {
        value: "isArchived",
        label: { cs: "Archivováno", en: "Archived" },
        dataItem: (data) => <ColumnData value="isArchived" data={data.data} />,
      },
    ];

    return result ?? null;

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ColumnData };
export default ColumnData;
//@@viewOff:exports
