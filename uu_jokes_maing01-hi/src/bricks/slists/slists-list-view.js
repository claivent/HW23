//@@viewOn:imports
import { createVisualComponent, Utils, useState } from "uu5g05";
import Config from "./config/config.js";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import SlistsTile from "./slists-tile";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";
import SlistsFilterBar from "./slists-filter-bar";
import {useDataListContext} from "../../core/providers/data-list-context";

//@@viewOff:imports

//@@viewOn:constants

//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      height: "90%",
      maxWidth: "90%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "50px"

    }),

  header: () =>
    Config.Css.css({
      display: "block",
      padding: 16,
      height: 48,
    }),

  content: (image) =>
    Config.Css.css({
      display: "flex",
      alignItems: image ? "center" : "left",
      justifyContent: image ? "center" : "flex-start",
      height: "calc(100% - 48px - 48px)",
      overflow: "hidden",
    }),

  grid: () =>
    Config.Css.css({
      marginLeft: 3,
      marginRight: 3,
      marginTop: 10,
    }),

  text: () =>
    Config.Css.css({
      display: "block",
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 16,
    }),

  image: () => Config.Css.css({ width: "100%" }),

  footer: () =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 48,
      marginTop: 8,
      paddingLeft: 16,
      paddingRight: 8,
    }),

  infoLine: () =>
    Config.Css.css({
      display: "block",
      marginLeft: 16,
      marginTop: 8,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SlistsListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SlistsListView",

  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {



    const datalist =  useDataListContext();
    //console.log("SLISTS-VIEW-datalist", datalist);
    //@@viewOn:private
    const { children } = props;

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const [createOpen, setCreateOpen] = useState(false);
    const [archiveFilterList, setArchiveFilterList] = useState([{ key: "archive", value: false }]);

    function handleCreateSitem(formData) {
      console.log("submit", formData);
      return (
        {
          "name": formData.name,
          "notes": formData.notes
        });
    }
    function handlerMapCreate(data){
      return datalist.DATA.handlerMap.create(data);
    }
    function handelMapDelete(data){
      return datalist.DATA.handlerMap.delete(data);
    }

    function handleMembers(data){

      const seznam = datalist.UData.data;
        const vybraneZaznamy = seznam.filter( zaznam => data.includes(zaznam.data._uuIdentity)  );
     if( vybraneZaznamy.length !== 0 )  { return vybraneZaznamy.map(zaznam => zaznam.data._name).join(', ')} else { return "notMembers" }
  }


    const FILTER_DEFINITION_LIST = [
      {
        key: "archive",
        label: "Pouze Archivované",
        filter: (item, value) => {
         // console.log("Archiveitem",item,"value", value);
          if (value) {
            let itemValue = typeof item.data.isArchived === "object" ? Utils.Language.getItem(item.data.isArchived) : item.data.isArchived;
            //console.log("archiveItemValue",itemValue);
            return item.data.isArchived === true;
          }
          return true;
        },
        inputType: "bool",

      },

    ]
    console.log("DATALIST",datalist);
    console.log("LISTWIEWPROPS",props);
    return (
      <>
        <Uu5Tiles.ControllerProvider
          data={datalist.DATA.data}

          filterDefinitionList={FILTER_DEFINITION_LIST}
          filterList={archiveFilterList}
          onFilterChange={(e) => {
            setArchiveFilterList(e.data.filterList)
          }}
        >

          <Uu5Elements.Block className={Css.main()}
                             header={
                               <Uu5Elements.Header
                                 title="Nákupní seznamy"
                                 subtitle="Pro vás"
                                 icon="uugds-favorites"
                                 // onIconClick={() => alert("click")}
                               />}

                             actionList={[
                               { component: <Uu5TilesControls.FilterButton type="bar"/> },
                               { icon: "uugdsstencil-uiaction-plus-circle-solid", children: "vytvořit", onClick: () => setCreateOpen(true) }
                             ]}
          >

           <SlistsFilterBar/>
            <Uu5TilesElements.Grid  tileMinWidth={300}  tileMaxWidth={400} >

              <SlistsTile key={datalist.DATA.data.id}

                onUpdates={props.onUpdates}
                members={handleMembers}
              />


            </Uu5TilesElements.Grid>


            <Uu5Forms.Form.Provider key={createOpen} handlerMap={datalist.DATA.handlerMap} onSubmit={async (e) => {
              await handlerMapCreate(handleCreateSitem({ ...e.data.value }));
              setCreateOpen(false);
              console.log("submit", e.data);
            }}>
              <Uu5Elements.Modal open={createOpen} onClose={() => {
                setCreateOpen(false)
              }} header={"Vytvořit seznam"} footer={<Uu5Forms.SubmitButton/>}>
                <Uu5Forms.Form.View gridLayout={{ xs: "name, notes", s: "name notes" }}>
                  <Uu5Forms.FormText name={"name"} label="Name"  minLength={3} maxLength={100} required={true} />
                  <Uu5Forms.FormText name={"notes"} label="Notes" minLength={3} maxLength={4000}/>
                </Uu5Forms.Form.View>
              </Uu5Elements.Modal>
            </Uu5Forms.Form.Provider>
          </Uu5Elements.Block>
        </Uu5Tiles.ControllerProvider>

      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SlistsListView };
export default SlistsListView;
//@@viewOff:exports
