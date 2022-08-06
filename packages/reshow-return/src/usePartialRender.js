import { useState, useMemo } from "react";
import { useReduceStore, Map } from "reshow-flux";
import { IS_ARRAY } from "reshow-constant";
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
    return (IS_ARRAY(renderKeys) ? renderKeys : []).map((name) =>
      buildReturn(
        { key: name, name, initStates: [name] },
        (props) => props[props.name] || null
      )
    );
  }, [renderKeys]);

  return [renderItems, setPartialRender, setRenderKeys];
};

export default usePartialRender;
