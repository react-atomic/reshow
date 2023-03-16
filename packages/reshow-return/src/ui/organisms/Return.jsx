// @ts-check
import { useConnect as useConn } from "reshow-flux";
import MemoReturn from "../organisms/MemoReturn";
import connectOptions from "../../connectOptions";

/**
 * @typedef {object} GetReturnOptions
 * @property {string} [displayName]
 * @property {function} [useConnect]
 * @property {string[]} [cleanProps]
 * @property {object} [options]
 */

/**
 * @typedef {object} ReturnProps
 * @property {string} store
 * @property {import("../../connectOptions").InitStatesProps} initStates
 * @property {import("react").ReactChild} children 
 * @property {boolean} backfillProps
 */


/**
 * @param {GetReturnOptions} props
 */
const getReturn = ({
  displayName = "Return",
  useConnect,
  cleanProps,
  options,
} = {}) => {
  useConnect = useConnect || useConn({ ...connectOptions, ...options });
  /**
   * @param {ReturnProps} props
   */
  const Return = (props) => {
    const { children, backfillProps, ...otherProps } = props;
    const state = useConnect(props);
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
