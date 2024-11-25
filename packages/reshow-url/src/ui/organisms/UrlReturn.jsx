import { getReturn, ClientReturn } from "reshow-return";
import getUrlReducer from "../../stores/urlStore";

const UrlReturn = getReturn({
  displayName: "UrlReturn",
  options: {
    storeLocator: () => getUrlReducer().store,
  },
});

export default ClientReturn(UrlReturn);
