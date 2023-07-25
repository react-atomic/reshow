// @ts-check

import build from "reshow-build";
import { useLoaded } from "reshow-hooks";
import { hasWin, win } from "win-doc";
import { connectOptions } from "reshow-return";

const hydrate = () => /**@type any*/ (win()).Reshow?.hydrate;

/**
 * Example:
 * https://github.com/react-atomic/reshow/blob/main/packages/reshow-url/src/ui/organisms/UrlReturn.jsx
 * @param {React.ReactNode} comp
 * @param {string[]} cleanProps
 * @returns {React.ElementType}
 */
const ClientReturnHoc = (comp, cleanProps) => {
  /**
   * @param {any} [props]
   */
  const ClientReturn = (props) => {
    if (!hasWin() || hydrate()) {
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
