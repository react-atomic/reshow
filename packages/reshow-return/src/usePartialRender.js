// @ts-check

import { useMemo, useState } from "react";
import { useReduceStore, Map, mergeMap } from "reshow-flux";
import build from "reshow-build";
import callfunc from "call-func";
import { IS_ARRAY } from "reshow-constant";

import Return from "./ui/organisms/Return";

/**
 * @template StateType
 * @typedef {import('reshow-flux-base').DispatchType<StateType>} DispatchType
 */

/**
 * @template ChildrenType
 * @param {string[]} [initRenderKeys]
 * @param {{[key: string]: React.ReactElement}} [initChildren]
 * @returns {[React.ReactElement[], DispatchType<ChildrenType>, DispatchType<any>]}
 */
const usePartialRender = (initRenderKeys, initChildren) => {
  const [renderStore, setPartialRender] = useReduceStore(
    (state, action) => mergeMap(state, action),
    () => Map(callfunc(initChildren))
  );

  const [renderKeys, setRenderKeys] = useState(() => callfunc(initRenderKeys));

  const renderItems = useMemo(() => {
    const buildReturn = build(build(Return)({ store: renderStore }));

    /**
     * renderKeys could use array like data structure.
     * such as immutable.js
     */
    return (IS_ARRAY(renderKeys) ? renderKeys : []).map(
      /**
       * @param {string} name
       */
      (name) =>
        buildReturn(
          { key: name, name, initStates: [name] },
          /**
           * @param {any} props
           */
          (props) => props[props.name] || null
        )
    );
  }, [renderKeys]);

  return [renderItems, setPartialRender, setRenderKeys];
};

export default usePartialRender;
