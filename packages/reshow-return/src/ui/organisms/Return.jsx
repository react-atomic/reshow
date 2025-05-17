// @ts-check
import { useConnect as useConn } from "reshow-flux";
import MemoReturn from "../organisms/MemoReturn";
import connectOptions from "../../connectOptions";
import * as React from "react";

/**
 * @typedef {object} GetReturnOptions
 * @property {string} [displayName]
 * @property {function} [useConnect]
 * @property {string[]} [cleanProps]
 * @property {object} [options]
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {object} ReturnProps
 * @property {import("reshow-flux-base").StoreObject<StateType, ActionType>} store
 * @property {import("../../connectOptions").InitStatesType} [initStates]
 * @property {{[key: string]: string[]}} [pathStates]
 * @property {import("react").ReactNode[] | import("react").ReactNode} [children]
 * @property {boolean} [backfillProps]
 */

/**
 * @param {GetReturnOptions} props
 * @returns {React.ElementType}
 */
const getReturn = ({
  displayName = "Return",
  useConnect,
  cleanProps,
  options,
} = {}) => {
  useConnect = useConnect || useConn({ ...connectOptions, ...options });
  /**
   * @template StateType
   * @template ActionType
   *
   * @param {ReturnProps<StateType, ActionType>} props
   */
  const Return = (props) => {
    const { children, backfillProps, ...otherProps } = props;
    const state = /** @type function*/ (useConnect)(props);
    const nextProps = backfillProps
      ? {
          ...state,
          ...connectOptions.reset(otherProps, cleanProps),
        }
      : {
          ...connectOptions.reset(otherProps, cleanProps),
          ...state,
        };
    return <MemoReturn props={nextProps}>{children}</MemoReturn>;
  };

  Return.displayName = displayName;
  return Return;
};

const Return = getReturn();

export default Return;
export { getReturn };
