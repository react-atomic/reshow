/**
 * @typedef {Object.<string, any>} Payload
 */
/**
 * @typedef {import("reshow-constant").SAFE_UNDEFINED} SAFE_UNDEFINED
 */
/**
 * @interface
 */
export class ActionObject {
    /** @type {string|SAFE_UNDEFINED=} */
    type: (string | SAFE_UNDEFINED) | undefined;
    /** @type {Payload=} */
    params: Payload | undefined;
}
/**
 * @template [ActionType=ActionObject]
 * @typedef {ActionType} RefineAction
 */
/**
 * @template StateType
 * @template ActionType
 * @callback FluxHandler
 * @param {StateType} NextState
 * @param {RefineAction<ActionType>} Action
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
 * @param {RefineAction<ActionType>} action
 * @param {StateType} prevState
 */
/**
 * @template StateType
 * @template ActionType
 * @interface
 */
export class Emiter<StateType, ActionType> {
    /** @type {EmitterResetCall<StateType, ActionType>} */
    reset: EmitterResetCall<StateType, ActionType>;
    /** @type {EmitterAddCall<StateType, ActionType>} */
    add: EmitterAddCall<StateType, ActionType>;
    /** @type {EmitterRemoveCall<StateType, ActionType>} */
    remove: EmitterRemoveCall<StateType, ActionType>;
    /** @type {EmitterEmitCall<StateType, ActionType>} */
    emit: EmitterEmitCall<StateType, ActionType>;
}
/**
 * @template StateType
 * @template ActionType
 * @interface
 */
export class StoreObject<StateType, ActionType> {
    /** @type {function():StateType} */
    reset: () => StateType;
    /** @type {function():StateType} */
    getState: () => StateType;
    /** @type {Emiter<StateType, ActionType>["add"]} */
    addListener: Emiter<StateType, ActionType>["add"];
    /** @type {Emiter<StateType, ActionType>["remove"]} */
    removeListener: Emiter<StateType, ActionType>["remove"];
}
export type Payload = {
    [x: string]: any;
};
export type SAFE_UNDEFINED = import("reshow-constant").SAFE_UNDEFINED;
export type RefineAction<ActionType = ActionObject> = ActionType;
export type FluxHandler<StateType, ActionType> = (NextState: StateType, Action: RefineAction<ActionType>, PrevState: StateType) => any;
export type EmitterResetCall<StateType, ActionType> = () => FluxHandler<StateType, ActionType>[];
export type EmitterAddCall<StateType, ActionType> = (handler: FluxHandler<StateType, ActionType>) => number;
export type EmitterRemoveCall<StateType, ActionType> = (handler: FluxHandler<StateType, ActionType>) => FluxHandler<StateType, ActionType>[];
export type EmitterEmitCall<StateType, ActionType> = (state: StateType, action: RefineAction<ActionType>, prevState: StateType) => any;
