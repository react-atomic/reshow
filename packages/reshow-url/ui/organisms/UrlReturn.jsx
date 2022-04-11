import { getReturn } from "reshow-return";

import urlStore from "../../src/stores/urlStore";
import ClientReturn from "../organisms/ClientReturn";

const UrlReturn = getReturn({
  displayName: "UrlReturn",
  options: {
    storeLocator: () => urlStore,
  },
});

export default ClientReturn(UrlReturn);
