//@@viewOn:imports
import {
  createComponent,
  Utils,
  useState,
  Lsi,
  useRef,
  useEffect,
  createVisualComponent,
  useContext,
  useUpdateEffect
} from "uu5g05";
import Config from "./config/config.js";
import {useDataListContext} from "../../core/providers/data-list-context";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements, {Modal} from "uu5g05-elements";
import {ContextDataList} from "../../core/providers/data-list-context";
import Uu5Forms from "uu5g05-forms";
import useDidMountEffect from "../../core/hookUseDidMounEffect";
import Modals from "./modals";

//@@viewOff:imports
//@@viewOn:constants

const COLUMN_LIST = [
  {value: "name", header: "Produkt"},
  {value: "amount", header: "Množství"},
  {value: "unit", header: "Jednotka"},
  {value: "active", header: "Zakoupeno"},
  {type: "actionList"},
];


const DIALOG_MESSAGE = {
  cs: "Smazat tuto položku?",
  en: "Delete this item?",
};

const VIEW_LIST = [
  {label: "Table", icon: "uugds-view-list", value: "table"},
  {label: "Grid", icon: "uugds-view-grid", value: "grid"},
];

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
  body: () =>
    Config.Css.css({
      display: "block",
      padding: 16,
      height: 48,
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

const SItemsListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SItemsListView",
  //@@viewOff:statics
  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes
  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {


    const datalist = useContext(ContextDataList);
    // console.log("datalist", datalist);
    let list = {};
    datalist.data.find((item) => {
      item.data.id.toString() === props.listId && (list = item);
    });
    let DATA = list.data.shoppingItems;


    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    const [view, setView] = useState("table");
    const [confirmRemove, setConfirmRemove] = useState({open: false, id: undefined});
    const [data, setData] = useState(DATA.map((it) => ({ ...it, color: it.active === false ? undefined : "green",      id: Utils.String.generateId() })));
    const [itemsFilterList, setItemsFilterList] = useState([{key: "koupeno", value: false}]);
    const[modalOpen, setModalOpen] = useState([false, 0]);
    const dataRef = useRef(data);


    function handlerMapUpdate(data) {
      return datalist.handlerMap.update(data);
    }

    function handleClick(id, color) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? {...item, active: !item.active, color: item.active ? undefined : "green"}
            : item
        )
      );
    }

    function  handleSubmit(e){
      const data =e.data.value; /* data z  formuláře*/
      addItem(data);
      setModalOpen(false, 0);
    }
    function addItem(data){
      //save data
      setData(([...actualItemList])=>{

        actualItemList.push({id: Utils.String.generateId(),  ...data, active: true, });
        console.log ("dddddddddddddd",actualItemList);
        return actualItemList;
      })
    }


    useEffect(() => {
      // you know what is this, don't you?
    }, []);


    useDidMountEffect(() => {
      if (dataRef.current !== undefined) {
        handlerMapUpdate({id: list.data.id, shoppingItems: data})

        console.log("useeffect proběhl", list.data.id, data);
      } else {
        //console.log("první mount neproběhl")
      }
    }, [data]);

    function getRowProps({data, serieValue, index}) {
      let significance;
      const {color} = data;
      if (color) {
        significance = "highlighted";
      }
      return {colorScheme: color, significance};
    }

    /*@@viewOn:example*/
    function getActionList({rowIndex, data}) {
      return [
        {
          icon: "uugds-pencil",
          onClick: () => setModalOpen([true, 0]),
          collapsed: false,
        },
        {
          icon: "uugds-plus",
          onClick: () => setModalOpen([true, 1]),
          collapsed: false,
        },
        {
          icon: "uugdsstencil-alert-check-circle",
          colorScheme: "green",
          tooltip: "Set to Green",
          onClick: (e) => handleClick(data.id, "green"),
          collapsed: false,
        },

        {
          icon: "uugds-delete",
          tooltip: "Delete item",
          onClick: (e) => setConfirmRemove({open: true, id: data.id}),
        },
      ];
    }

    /*@@viewOff:example*/


    //@@viewOn:private
    const {children} = props;

    let blockProps = {
      header: (
        <Uu5Elements.Text category="story" segment="heading" type="h4">
          {list.data.name}
        </Uu5Elements.Text>
      ), card: "full",
    };

    const FILTER_DEFINITION_LIST = [
      {
        key: "koupeno",
        label: "Pouze nenakoupené",
        filter: (item, value) => {
          //console.log("Archiveitem", item, "value", value);
          if (value) {
            let itemValue = typeof item.active === "object" ? Utils.Language.getItem(item.active) : item.active;
           // console.log("archiveItemValue", itemValue);
            return item.active === false;
          }
          return true;
        },
        inputType: "bool",

      },

    ]
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div>
        <Uu5Tiles.ControllerProvider
          data={DATA}

          filterDefinitionList={FILTER_DEFINITION_LIST}
          filterList={itemsFilterList}
          onFilterChange={(e) => {
            setItemsFilterList(e.data.filterList)
          }}
        >
          <Uu5Elements.Block className={Css.main()}
                             header={<Uu5Elements.Header title="Editace položek"/>}

                             actionList={[
                               {component: <Uu5TilesControls.FilterButton type="bar"/>},
                               {
                                 icon: "uugdsstencil-uiaction-plus-circle-solid",
                                 children: "vytvořit",
                                 onClick: () => setCreateOpen(true)
                               }
                             ]}
          >

            {/*@@viewOn:example*/}
            <Uu5Tiles.ViewProvider viewList={VIEW_LIST} value={view} onChange={(e) => setView(e.data.value)}>
              <Uu5Elements.Block {...blockProps}
                                 actionList={[{component: <Uu5TilesControls.ViewButton/>},
                                 {icon: "uugds-plus", onClick: ()=> setModalOpen([true, 1])  }]}
              >
                <Uu5TilesControls.FilterBar initialExpanded={true} displayManagerButton={false} displayClearButton={false}/>
                <Uu5TilesControls.FilterManagerModal/>
                <Uu5TilesElements.List
                 // data={data}
                  columnList={ view == "table" ? COLUMN_LIST.map((column) => ({ ...column,      cellComponent: (props) => {    let significance, colorScheme;      const {color} = props.data;
                          if (color) {  colorScheme = color;  significance = "highlighted";     }

                          return (
                            <Uu5TilesElements.Table.Cell  {...props}  significance={significance}  colorScheme={colorScheme}   />
                          );
                        },
                      }))
                      : COLUMN_LIST
                  }
                  tileMinWidth={280}     tileMaxWidth={300}    view={view}
                  getActionList={getActionList}
                >
                  <Uu5TilesElements.Grid.DefaultTile
                    getRowProps={getRowProps}
                    header={
                      <Uu5Elements.Text category="interface" segment="title" type="micro">
                        <Lsi lsi={{cs: "Produkt", en: "Products"}}/>
                      </Uu5Elements.Text>
                    }
                  />
                </Uu5TilesElements.List>
              </Uu5Elements.Block>
            </Uu5Tiles.ViewProvider>



            {/*@@viewOff:example*/}

            <Uu5Elements.Dialog
              open={confirmRemove.open}
              onClose={() => setConfirmRemove({open: false})}
              header={<Lsi lsi={DIALOG_MESSAGE}/>}
              icon={<Uu5Elements.Svg code="uugdssvg-svg-delete"/>}
              actionDirection="horizontal"
              actionList={[
                {
                  children: <Lsi lsi={{en: "Cancel", cs: "Zrušit"}}/>,
                  onClick: () => setConfirmRemove({open: false}),
                  significance: "distinct",
                },
                {
                  children: <Lsi lsi={{en: "Delete", cs: "Smazat"}}/>,
                  onClick: (e) => {
                    setData((prevData) => prevData.filter((item) => item.id !== confirmRemove.id));
                  },
                  colorScheme: "red",
                  significance: "highlighted",
                },
              ]}
            />
          </Uu5Elements.Block>

          <Uu5Forms.Form.Provider key={modalOpen[1]} onSubmit = {handleSubmit}>
            <Modals
              open={ modalOpen[1] === 1 ? modalOpen[0]: false  }
              close={ ()=> setModalOpen(false, 0)}
              onClick={()=> setModalOpen(false, 0)}
              setData={data}
            />
          </Uu5Forms.Form.Provider>
          <Uu5Forms.Form.Provider key={modalOpen[0]} onSubmit = {handleSubmit}>
            <Modals
              open={ modalOpen[1] === 1 ? modalOpen[0]: false  }
              close={ ()=> setModalOpen(false, 0)}
              onClick={()=> setModalOpen(false, 0)}
              setData={data}
            />
          </Uu5Forms.Form.Provider>

        </Uu5Tiles.ControllerProvider>

      </div>

    )

    //@@viewOff:render
  },
});

//@@viewOn:exports
export {SItemsListView};
export default SItemsListView;
//@@viewOff:exports
