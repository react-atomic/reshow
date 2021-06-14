import React from "react";
import build from "reshow-build";
import { useConnect } from "reshow-flux";

import returnOptions from "../../src/returnOptions";

const Return = (props) => {
  const {useConnect, children, ...otherProps} = props; 
  const state = useConnect(props);
  const result =  build(children)({
    ...returnOptions.reset(otherProps),
    ...state
  });
  return result;
}

Return.defaultProps = {
  useConnect: useConnect(returnOptions)
};

export default Return;
