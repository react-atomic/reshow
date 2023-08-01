// @ts-check

import { useMemo, useState } from "react";
import { useReduceStore, Map, mergeMap } from "reshow-flux";
import build from "reshow-build";
import callfunc from "call-func";

import Return from "./ui/organisms/Return";

/**
 * @template StateType
 * @template ActionType
 * @typedef {import('reshow-flux-base').DispatchType<StateType, ActionType>} DispatchType
 */

/**
 * @template ChildrenType
 * @param {string[]|Immutable.Seq} [initRenderKeys]
 * @param {{[key: string]: React.ReactElement}|Immutable.Map<string,React.ReactElement>} [initChildren]
 * @returns {[React.ReactElement[], DispatchType<any, ChildrenType>, DispatchType<any, string[]>]}
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
    return (renderKeys || []).map(
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
