// @ts-check

import build from "reshow-build";
import { useLoaded } from "reshow-hooks";
import { connectOptions } from "reshow-return";
import hydrate from "../../hydrate";

/**
 * Example:
 * https://github.com/react-atomic/reshow/blob/main/packages/reshow-url/src/ui/organisms/UrlReturn.jsx
 * @param {React.ReactNode} comp
 * @param {string[]} cleanProps
 * @returns {React.ElementType}
 */
const ClientReturnHoc = (comp, cleanProps) => {
  /**
   * @typedef {object} ClientReturnType
   * @property {boolean} [isHydrate]
   * @property {React.ReactNode} [children]
   * @property {boolean} [backfillProps]
   * @property {any} [props]
   */

  /**
   * @param {ClientReturnType} allprops
   */
  const ClientReturn = ({ isHydrate, ...props }) => {
    if (hydrate() || isHydrate) {
      const isLoad = useLoaded();
      if (!isLoad) {
        const { children, backfillProps, ...restProps } = props;
        return build(children)(connectOptions.reset(restProps, cleanProps));
      }
    }
    return build(comp)(props);
  };
  return ClientReturn;
};

export default ClientReturnHoc;
