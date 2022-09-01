import { getReturn, ClientReturn } from "reshow-return";
import urlStore from "../../stores/urlStore";

const UrlReturn = getReturn({
  displayName: "UrlReturn",
  options: {
    storeLocator: () => urlStore,
  },
});

export default ClientReturn(UrlReturn);
