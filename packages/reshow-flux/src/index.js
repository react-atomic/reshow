//@ts-check

/**
 * @typedef {import("./useConnect").CalculateStateCallback} CalculateStateCallback
 */

/**
 * @typedef {import("./ImmutableStore").StateMap} StateMap
 */

/**
 * @typedef {import("./ImmutableStore").ReducerTypeWithMap} ReducerTypeWithMap
 */

/**
 * @template StateType
 * @typedef {import("./ImmutableStore").InitStateWithMap<StateType>} InitStateWithMap
 */

export { default as useConnect } from "./useConnect";
export { default as useImmutable } from "./useImmutable";
export { default as useReduceStore } from "./useReduceStore";
export { default as useStore } from "./useStore";
export { default as toJS } from "./toJS";
export {
  default as ImmutableStore,
  equal,
  forEachMap,
  fromJS,
  mergeMap,
  Map,
  Set,
} from "./ImmutableStore";
