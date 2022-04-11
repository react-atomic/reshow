import build from "reshow-build";
import { hasWin, win } from "win-doc";
import { useLayoutEffect, useState } from "react";

const ClientReturn = (comp) => (props) => {
  const hydrate = win().Reshow?.hydrate;
  if (hydrate || !hasWin()) {
    const [isLoad, setIsLoad] = useState();
    if (hasWin()) {
      useLayoutEffect(() => {
        setIsLoad(true);
      });
    }
    return isLoad ? build(comp)(props) : null;
  } else {
    return build(comp)(props);
  }
};

export default ClientReturn;
