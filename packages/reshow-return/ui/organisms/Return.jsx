import React from "react";
import build from "reshow-build";
import { useConnect as useConn } from "reshow-flux";

import connectOptions from "../../src/connectOptions";

const getReturn = ({
  displayName = "Return",
  useConnect,
  cleanProps,
  options,
} = {}) => {
  useConnect = useConnect || useConn({ ...connectOptions, ...options });
  const Return = (props) => {
    const { children, backfillProps, ...otherProps } = props;
    const state = useConnect(props);
    const result = build(children)(
      backfillProps
        ? {
            ...state,
            ...connectOptions.reset(otherProps, cleanProps),
          }
        : {
            ...connectOptions.reset(otherProps, cleanProps),
            ...state,
          }
    );
    return result;
  };

  Return.displayName = displayName;
  return Return;
};

const Return = getReturn();

export default Return;
export { getReturn };
