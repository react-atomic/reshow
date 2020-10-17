import React from "react";
import build from "reshow-build";
import { connectHook } from "reshow-flux";

import returnOptions from "../../src/returnOptions";

const ReturnComponent = ({ children, ...props }) =>
  build(children)(returnOptions.reset(props));

ReturnComponent.displayName = "Return";
export default connectHook(ReturnComponent, returnOptions);
export { ReturnComponent };
