import { useState, useMemo } from "react";
import { useReduceStore, Map } from "reshow-flux";
import build from "reshow-build";

import Return from "../ui/organisms/Return";

const usePartialRender = (initRenderKeys, initChildren) => {
  const [renderStore, setPartialRender] = useReduceStore(null, () =>
    Map(initChildren)
  );

  const [renderKeys, setRenderKeys] = useState(() => initRenderKeys);

  const renderItems = useMemo(() => {
    const buildReturn = build(build(Return)({ store: renderStore }));
    return (renderKeys || []).map((name) =>
      buildReturn(
        { key: name, name, initStates: [name] },
        (props) => props[props.name] || null
      )
    );
  }, [renderKeys]);

  return [renderItems, setPartialRender, setRenderKeys];
};

export default usePartialRender;
