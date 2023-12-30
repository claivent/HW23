//@@viewOn:imports
import {createVisualComponent, Utils, useState, createComponent, Lsi} from "uu5g05";
import Config from "./config/config.js";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import SlistsTile from "./slists-tile";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";
import SlistsFilterBar from "./slists-filter-bar";
import {useDataListContext} from "../../core/providers/data-list-context";
import importLsi from "../../lsi/import-lsi";

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

  image: () => Config.Css.css({width: "100%"}),

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
    console.log("START-slists-list-view");

    const datalist = useDataListContext();

    // console.log("SLISTS-LIST-VIEW-PROPS", props);
    // console.log("SLISTS-LIST-VIEW-CONTEXT-DATALIST", datalist);
    //console.log("SLISTS-VIEW-datalist", datalist);
    //@@viewOn:private
    const {children} = props;

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const [createOpen, setCreateOpen] = useState(false);
    const [archiveFilterList, setArchiveFilterList] = useState([{ key: "archive", value: false }]);
    const [data, setData] = useState(props.setData);
    // console.log("SLISTS-LIST-VIEW-STATE-data", data);
    function handleCreateSitem(formData) {
      console.log("submit", formData);
      return (
        {
          "name": formData.name,
          "notes": formData.notes
        });
    }

    function handlerMapCreate(data) {
      return datalist.DATA.handlerMap.create(data);
    }

    function handleMembers(data) {
      const seznam = datalist.UData.data;
      const vybraneZaznamy = seznam.filter(zaznam => data.includes(zaznam.data._uuIdentity));
      if (vybraneZaznamy.length !== 0) {
        return vybraneZaznamy.map(zaznam => zaznam.data._name).join(', ')
      } else {
        return  <Lsi import={importLsi} path={["SlistsView", "notMembers"]}/>;
      }
    }


    const FILTER_DEFINITION_LIST = [
      {
        key: "archive",
        label: {children: <Lsi import={importLsi} path={["SlistsView", "archOnly"]}/>},
        filter: (item, value) => {
          if (value) {
            return item.data.isArchived === true;
          }
          return true;
        },
        inputType: "bool",
      },

    ]
    // console.log("DATALIST",datalist);
    // console.log("LISTWIEWPROPS",props);

    return (

        <Uu5Tiles.ControllerProvider
          data={props.setData}
          selectable="multiple"

          filterDefinitionList={FILTER_DEFINITION_LIST}
          filterList={archiveFilterList}
          onFilterChange={(e) => {
            setArchiveFilterList(e.data.filterList)
          }}
        >

          <Uu5Elements.Block className={Css.main()}
                             header={
                               <Uu5Elements.Header
                                 title= {<Lsi import={importLsi} path={["SlistsView", "title"]}/>}
                                 icon="uugds-favorites"
                                 //onIconClick={() => alert("click")}
                               />}

                             actionList={[
                               {component: <Uu5TilesControls.FilterButton type="bar"/>},
                               {
                                 icon: "uugdsstencil-uiaction-plus-circle-solid",
                                 children:  <Lsi import={importLsi} path={["SlistsView", "createList"]}/>,
                                 onClick: () => setCreateOpen(true)
                               }
                             ]}
          >

           <SlistsFilterBar/>
            <Uu5TilesControls.BulkActionBar />
            <Uu5TilesElements.Grid  tileMinWidth={400}  tileMaxWidth={400}
                                    draggable
                                    onDrop={(e) => props.drop(e.data.data)}
            >

              <SlistsTile

                onUpdates={props.onUpdates}
                members={handleMembers}
                setData={data}

              />


            </Uu5TilesElements.Grid>


            <Uu5Forms.Form.Provider key={createOpen} handlerMap={datalist.DATA.handlerMap} onSubmit={async (e) => {
              await handlerMapCreate(handleCreateSitem({...e.data.value}));
              setCreateOpen(false);

            }}>
              <Uu5Elements.Modal open={createOpen} onClose={() => {
                setCreateOpen(false)
              }} header={<Lsi import={importLsi} path={["SlistsViewForm", "title"]}/>} footer={<Uu5Forms.SubmitButton
              label = {<Lsi import={importLsi} path={["SlistsViewForm", "title"]}/>}     />}>
                <Uu5Forms.Form.View gridLayout={{xs: "name, notes", s: "name notes"}}>
                  <Uu5Forms.FormText name={"name"} label= {<Lsi import={importLsi} path={["SlistsViewForm", "name"]}/>} minLength={3} maxLength={100} required={true}/>
                  <Uu5Forms.FormText name={"notes"} label={<Lsi import={importLsi} path={["SlistsViewForm", "desc"]}/>} minLength={3} maxLength={4000}/>
                </Uu5Forms.Form.View>
              </Uu5Elements.Modal>
            </Uu5Forms.Form.Provider>
          </Uu5Elements.Block>
        </Uu5Tiles.ControllerProvider>


    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export {SlistsListView};
export default SlistsListView;
//@@viewOff:exports
