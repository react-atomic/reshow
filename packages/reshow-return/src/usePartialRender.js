import { useState, useMemo } from "react";
import { useReduceStore, Map } from "reshow-flux";
import build from "reshow-build";
import callfunc from "call-func";

import Return from "../ui/organisms/Return";

const usePartialRender = (initRenderKeys, initChildren) => {
  const [renderStore, setPartialRender] = useReduceStore(null, () =>
    Map(callfunc(initChildren))
  );

  const [renderKeys, setRenderKeys] = useState(() => callfunc(initRenderKeys));

  const renderItems = useMemo(() => {
    const buildReturn = build(build(Return)({ store: renderStore }));

    /**
     * renderKeys could use array like data structure.
     * such as immutable.js
     */
    return (renderKeys && renderKeys.map ? renderKeys : []).map((name) =>
      buildReturn(
        { key: name, name, initStates: [name] },
        (props) => props[props.name] || null
      )
    );
  }, [renderKeys]);

  return [renderItems, setPartialRender, setRenderKeys];
};

export default usePartialRender;
