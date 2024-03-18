// @ts-check

import { useState, useEffect, useDebugValue } from "react";
import { useMounted } from "reshow-hooks";
import { T_TRUE, T_FALSE } from "reshow-constant";

import getStore from "./getStore";

const handleShouldComponentUpdate = ({
  calOptions,
  shouldComponentUpdate,
  calculateState,
  prev,
  props,
}) => {
  const nextState = calculateState(prev.state, calOptions);
  const bUpdate = shouldComponentUpdate
    ? shouldComponentUpdate({ prev, nextProps: props, nextState })
    : nextState !== prev.state;

  if (bUpdate) {
    return {
      props,
      state: nextState,
      __init__: T_TRUE,
    };
  } else {
    prev.__init__ = T_TRUE;
    return prev;
  }
};

/**
 * @typedef {Record<string, any>} StateObject
 */

/**
 * @template StateType
 * @template ActionType
 * @typedef {import("reshow-flux-base").StoreObject<StateType, ActionType>} StoreObject
 */

/**
 * @template StateType
 * @template ActionType
 * @typedef {object} UseConnectWithStore
 * @property {StoreObject<StateType, ActionType>} store
 */

/**
 * @callback CalculateStateCallback
 * @param {StateObject} prevState
 * @param {any} calculateOptions
 * @returns {StateObject}
 */

/**
 * @callback GetStateCallback
 * @param {StateObject} props
 * @returns {StateObject}
 */

/**
 * @template StateType
 * @template ActionType
 * @typedef {object} UseConnectOption
 * @property {CalculateStateCallback} calculateState
 * @property {boolean} [shouldComponentUpdate]
 * @property {function(any):StoreObject<StateType, ActionType>} [storeLocator]
 * @property {string} [displayName]
 */

const useConnect =
  /**
   * @template StateType
   * @template ActionType
   * @param {UseConnectOption<StateType, ActionType>} inputOptions
   * @returns {GetStateCallback}
   */
  (inputOptions) => (props) => {
    /**
     * @type UseConnectWithStore<StateType, ActionType> & UseConnectOption<StateType, ActionType>
     */
    const options = getStore({ options: inputOptions, props });
    const {
      calculateState,
      shouldComponentUpdate,
      displayName = "useConnect",
    } = options;
    const calOptions = /**@type any*/ (options);

    useDebugValue(displayName);
    const [data, setData] = useState(() => ({
      props,
      state: calculateState({}, calOptions),
      __init__: T_FALSE,
    }));

    const isMount = useMounted();

    useEffect(
      () => {
        const handleChange = (/** @type any */ storeSyncState) => {
          if (T_TRUE === isMount()) {
            /**
             * Why storeSyncState?
             *
             * It's useful for synchronous programing to get correct data,
             * when it pass from reducer directly.
             */
            calOptions.storeSyncState = storeSyncState;
            setData((prev) =>
              handleShouldComponentUpdate({
                calOptions,
                calculateState,
                shouldComponentUpdate,
                prev,
                props,
              })
            );
          }
        };
        if (!data.__init__ || data.props !== props) {
          handleChange(options.store.getState());
        }
        options.store.addListener(handleChange);
        return () => {
          options.store.removeListener(handleChange);
        };
      },
      props.renewProps ? [props] : []
    );

    return data.state || {};
  };

export default useConnect;
