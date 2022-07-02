import build from "reshow-build";
import { useLoaded } from "reshow-hooks";
import { hasWin, win } from "win-doc";
import { connectOptions } from "reshow-return";

const hydrate = win().Reshow?.hydrate;

/**
 * Example: https://github.com/react-atomic/reshow/blob/main/packages/reshow-url/ui/organisms/UrlReturn.jsx
 */
const ClientReturnHoc = (comp, cleanProps) => {
  const ClientReturn = (props) => {
    if (hydrate || !hasWin()) {
      const isLoad = useLoaded();
      if (isLoad) {
        return build(comp)(props);
      } else {
        const { children, backfillProps, ...restProps } = props;
        return build(children)(connectOptions.reset(restProps, cleanProps));
      }
    } else {
      return build(comp)(props);
    }
  };
  return ClientReturn;
};

export default ClientReturnHoc;
