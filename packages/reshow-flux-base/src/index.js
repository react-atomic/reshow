//@ts-check

/**
 * @template StateType
 * @typedef {import("./createReducer").InitStateType<StateType>} InitStateType
 */

export {
  default as createReducer,
  refineAction,
  StoreObject,
  ActionObject,
} from "./createReducer";
export { default as SimpleMap } from "./SimpleMap";
