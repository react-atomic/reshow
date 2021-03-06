import React from "react";
import Return from "reshow-return";

import urlStore from "../../src/stores/urlStore";

const UrlReturn = (props) => <Return {...props} stores={[urlStore]} />;
UrlReturn.displayName = "UrlReturn";

export default UrlReturn;
