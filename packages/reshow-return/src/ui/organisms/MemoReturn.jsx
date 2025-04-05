// @ts-check

import * as React from "react";
import { useMemo } from "react";
import build from "reshow-build";

/**
 * @param {any} [props]
 * @returns {?React.ReactElement}
 */
const MemoReturn = (props) =>
  useMemo(
    () => build(props.children)(props.actualProps || props.props),
    [props.props],
  );

export default MemoReturn;
