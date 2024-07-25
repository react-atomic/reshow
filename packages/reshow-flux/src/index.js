//@ts-check

/**
 * @template StateType
 *
 * @typedef {import("./useConnect").CalculateStateCallback<StateType>} CalculateStateCallback
 */

/**
 * @typedef {import("./ImmutableStore").StateMap} StateMap
 */

/**
 * @typedef {import("./ImmutableStore").MaybeMapType} MaybeMapType
 */

/**
 * @template [StateType=StateMap]
 * @template [ActionType=MaybeMapType]
 * @typedef {import("./ImmutableStore").ReducerTypeWithMap<StateType, ActionType>} ReducerTypeWithMap
 */

export { default as useConnect } from "./useConnect";
export { default as useImmutable } from "./useImmutable";
export { default as useReduceStore } from "./useReduceStore";
export { default as useStore } from "./useStore";
export { default as toJS } from "./toJS";
export { forEachMap } from "get-object-value";
export {
  default as ImmutableStore,
  equal,
  fromJS,
  mergeMap,
  Map,
  Set,
} from "./ImmutableStore";
