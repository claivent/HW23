//@@viewOn:imports
import { createComponent, useDataList, useEffect, useRef, useMemo } from "uu5g05";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

export const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const slistDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        loadNext: handleLoadNext,
      },
      itemHandlerMap: {
        /*getImage: handleGetImage,*/
      },
    });

    const filterList = useRef([]);
    const sorterList = useRef([]);
    const imageUrlListRef = useRef([]);

    function handleLoad(criteria) {
      filterList.current = criteria?.filterList || [];

      let sorter;
      if (criteria?.sorterList) {
        // Now slist supports only 1 sorter per request.
        // Therefore we use the last added to the sorterList by the user.
        sorter = criteria.sorterList.at(criteria.sorterList.length - 1);
        sorterList.current = sorter ? [sorter] : [];
      } else {
        sorter = sorterList.current.at(0);
      }

      const dtoIn = getLoadDtoIn(filterList.current, sorter, criteria?.pageInfo);
      return Calls.Slist.list(dtoIn);
    }

    function handleLoadNext(pageInfo) {
      const criteria = getLoadDtoIn(filterList.current, sorterList.current, pageInfo);

      const dtoIn = { ...criteria, pageInfo };
      return Calls.Slist.list(dtoIn);
    }

    /*async function handleGetImage(joke) {
      const dtoIn = { code: joke.image };
      const imageFile = await Calls.Joke.getImage(dtoIn);
      const imageUrl = generateAndRegisterImageUrl(imageFile);
      return { ...joke, imageFile, imageUrl };
    }*/

    /*function generateAndRegisterImageUrl(imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      imageUrlListRef.current.push(imageUrl);
      return imageUrl;
    }*/

    /*useEffect(() => {
      // We don't use it to store reference on another React component
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
      return () => imageUrlListRef.current.forEach((url) => URL.revokeObjectURL(url));
      // We want to trigger this effect only once.
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);*/

    const value = useMemo(() => {
      return { slistDataList, filterList: filterList.current, sorterList: sorterList.current };
    }, [slistDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return typeof props.children === "function" ? props.children(value) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getLoadDtoIn(filterList, sorter, pageInfo) {
  const filterMap = filterList.reduce((result, item) => {
    result[item.key] = item.value;
    return result;
  }, {});

  let dtoIn = { ...filterMap };

  if (sorter) {
    dtoIn.sortBy = sorter.key;
    dtoIn.order = sorter.ascending ? "asc" : "desc";
  }

  if (pageInfo) {
    dtoIn.pageInfo = pageInfo;
  }

  return dtoIn;
}
//@@viewOff:helpers
export default ListProvider;