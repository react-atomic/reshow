import React from "react";
import build from "reshow-build";
import { useConnect } from "reshow-flux";

import returnOptions from "../../src/returnOptions";

const getReturn = ({ defaultProps, displayName = "Return" }) => {
  const Return = (props) => {
    const { useConnect, children, cleanProps, ...otherProps } = props;
    const state = useConnect(props);
    const result = build(children)({
      ...returnOptions.reset(otherProps, cleanProps),
      ...state,
    });
    return result;
  };

  Return.defaultProps = defaultProps;
  Return.displayName = displayName;
  return Return;
};

const Return = getReturn({
  defaultProps: { useConnect: useConnect(returnOptions) },
});

export default Return;
export { getReturn };
