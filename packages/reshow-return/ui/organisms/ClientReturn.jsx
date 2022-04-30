import build from "reshow-build";
import { useLoaded } from "reshow-hooks";
import { hasWin, win } from "win-doc";
import { connectOptions } from "reshow-return";

/**
 * Example: https://github.com/react-atomic/reshow/blob/main/packages/reshow-url/ui/organisms/UrlReturn.jsx
 */
const ClientReturn = (comp, cleanProps) => (props) => {
  const hydrate = win().Reshow?.hydrate;
  if (hydrate || !hasWin()) {
    const isLoad = useLoaded();
    if (isLoad) {
      return build(comp)(props);
    } else {
      const { children, backfillProps, ...otherProps } = props;
      return build(children)(connectOptions.reset(otherProps, cleanProps));
    }
  } else {
    return build(comp)(props);
  }
};

export default ClientReturn;
