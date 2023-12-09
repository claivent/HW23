//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import ListProvider from "./list-provider";
import CategoryListProvider from "../category/list-provider";
import ListView from "./list-view";
import Config from "./config/config";
import slistListProvider from "../../bricks/slists/slist-list-provider";
//@@viewOff:imports

export const List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {


    {console.log(slistDataList) ;}

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return (
      <ListProvider>
        {({ slistDataList, filterList, sorterList }) => (
          <CategoryListProvider>
            {(categoryDataList) => (
              <ListView
                slistDataList={slistDataList}
                categoryDataList={categoryDataList}
                filterList={filterList}
                sorterList={sorterList}
              />
            )}
          </CategoryListProvider>
        )}
      </ListProvider>
    );
    //@@viewOff:render
  },
});

export default List;
