// @ts-check

/**
 * @typedef {Object<string, any>} Payload
 */

/**
 * @template [ActionType = ActionObject]
 * @typedef {ActionType|ActionObject} RefinedAction
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @callback FluxHandler
 * @param {StateType=} NextState
 * @param {RefinedAction<ActionType>=} Action
 * @param {StateType=} PrevState
 * @returns{any}
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @callback EmitterEmitCall
 * @param {StateType=} state
 * @param {RefinedAction<ActionType>=} action
 * @param {StateType=} prevState
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
 * @typedef {StateType|function():StateType} InitStateType
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @callback ReducerType
 * @param {StateType} ReducerState
 * @param {ActionType} ReducerAction
 * @returns {StateType}
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @callback DispatchCallback
 * @param {StateType} State
 * @returns {ActionType}
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {string|ActionType|DispatchCallback<StateType, ActionType>} DispatchAction
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @callback DispatchFunction
 * @param {DispatchAction<StateType, ActionType>} action
 * @param {Payload} [actionParams]
 * @returns {StateType} endingState
 */

/**
 * @typedef {object} ActionObject
 * @property {string} type
 * @property {?Payload=} params
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {object} Emiter
 * @property {EmitterResetCall<StateType, ActionType>} reset
 * @property {EmitterAddCall<StateType, ActionType>} add
 * @property {EmitterRemoveCall<StateType, ActionType>} remove
 * @property {EmitterEmitCall<StateType, ActionType>} emit
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {object} StoreObject
 * @property {function():StateType} reset
 * @property {function():StateType} getState
 * @property {Emiter<StateType, ActionType>["add"]} addListener
 * @property {Emiter<StateType, ActionType>["remove"]} removeListener
 */

export default {};
