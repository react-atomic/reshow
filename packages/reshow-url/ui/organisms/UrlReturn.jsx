import { getReturn } from "reshow-return";
import { ClientReturn } from "reshow-return";

import urlStore from "../../src/stores/urlStore";

const UrlReturn = getReturn({
  displayName: "UrlReturn",
  options: {
    storeLocator: () => urlStore,
  },
});

export default ClientReturn(UrlReturn);
