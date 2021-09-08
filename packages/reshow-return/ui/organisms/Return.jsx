import React from "react";
import build from "reshow-build";
import { useConnect } from "reshow-flux";

import connectOptions from "../../src/connectOptions";

const getReturn = ({ useConnect, cleanProps, displayName = "Return" }) => {
  const Return = (props) => {
    const { children, ...otherProps } = props;
    const state = useConnect(props);
    const result = build(children)({
      ...connectOptions.reset(otherProps, cleanProps),
      ...state,
    });
    return result;
  };

  Return.displayName = displayName;
  return Return;
};

const Return = getReturn({
  useConnect: useConnect(connectOptions),
});

export default Return;
export { getReturn };
