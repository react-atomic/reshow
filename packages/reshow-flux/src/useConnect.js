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
 * @template StateType
 *
 * @callback CalculateStateCallback
 * @param {StateType|any} prevState
 * @param {any} calculateOptions
 * @returns {StateType}
 */

/**
 * @template StateType
 *
 * @callback GetStateCallback
 * @param {any} props
 * @returns {StateType}
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {object} UseConnectOption
 * @property {CalculateStateCallback<StateType>} calculateState
 * @property {boolean} [shouldComponentUpdate]
 * @property {function(any):StoreObject<StateType, ActionType>} [storeLocator]
 * @property {string} [displayName]
 */

const useConnect =
  /**
   * @template StateType
   * @template ActionType
   *
   * @param {UseConnectOption<StateType, ActionType>} inputOptions
   * @returns {GetStateCallback<StateType>}
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
              }),
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
      props.renewProps ? [props] : [],
    );

    return /**@type StateType*/ (data.state || {});
  };

export default useConnect;
