// @ts-check

/**
 * @typedef {Object.<string, any>} Payload
 */

/**
 * @interface
 */
export class ActionObject {
  /** @type {string=} */
  type;
  /** @type {Payload=} */
  params;
}

/**
 * @template StateType
 * @template ActionType
 * @callback FluxHandler
 * @param {StateType} NextState
 * @param {ActionType} Action
 * @param {StateType} PrevState
 * @returns{any}
 */

/**
 * @template StateType
 * @template ActionType
 * @callback EmitterResetCall
 * @returns {FluxHandler<StateType, ActionType>[]}
 */

/**
 * @template StateType
 * @template ActionType
 * @callback EmitterAddCall
 * @param {FluxHandler<StateType, ActionType>} handler
 * @returns {number}
 */

/**
 * @template StateType
 * @template ActionType
 * @callback EmitterRemoveCall
 * @param {FluxHandler<StateType, ActionType>} handler
 * @returns {FluxHandler<StateType, ActionType>[]}
 */

/**
 * @template StateType
 * @template ActionType
 * @callback EmitterEmitCall
 * @param {StateType} state
 * @param {ActionType} action
 * @param {StateType} prevState
 */

/**
 * @template StateType
 * @template ActionType
 * @interface
 */
export class Emiter {
  /** @type {EmitterResetCall<StateType, ActionType>} */
  reset;
  /** @type {EmitterAddCall<StateType, ActionType>} */
  add;
  /** @type {EmitterRemoveCall<StateType, ActionType>} */
  remove;
  /** @type {EmitterEmitCall<StateType, ActionType>} */
  emit;
}

/**
 * @template StateType
 * @template ActionType
 * @interface
 */
export class StoreObject {
  /** @type {function():StateType} */
  reset;
  /** @type {function():StateType} */
  getState;
  /** @type {Emiter<StateType, ActionType>["add"]} */
  addListener;
  /** @type {Emiter<StateType, ActionType>["remove"]} */
  removeListener;
}
