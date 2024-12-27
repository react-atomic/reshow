// @ts-check

/**
 * @template T
 * @typedef {import("react").SetStateAction<T>} SetStateAction
 */

/**
 * @template T
 * @typedef {import("react").Dispatch<SetStateAction<T>>} DispatchSetStateAction
 */

/**
 * @template T
 * @typedef {[T, DispatchSetStateAction<T>]} useState
 */

/**
 * Basic type
 */
export const FUNCTION = "function";
export const NUMBER = "number";
export const OBJECT = "object";
export const STRING = "string";
export const SYMBOL = "symbol";
export const UNDEFINED = "undefined";

// string
export const DEFAULT = "default";
export const SCRIPT = "script";
export const TYPE_ERROR = "TypeError";

/**
 * @typedef {T_UNDEFINED|T_NULL|T_FALSE|0} SAFE_UNDEFINED
 */

/**
 * @type undefined
 */
export const T_UNDEFINED = void 0;
/**
 * @type null
 */
export const T_NULL = null;
export const T_TRUE = true;
export const T_FALSE = false;
export const KEYS = Object.keys;
export const IS_ARRAY = Array.isArray;
/**
 * @param {object|string?=} o
 * @returns {number}
 */
export const OBJ_SIZE = (o) => (o ? KEYS(o).length : 0);
/**
 * @returns {any}
 */
export const NEW_OBJ = () => Object.create(null);

/**
 * Object.hasOwn()
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn#problematic_cases_for_hasownproperty
 * https://github.com/react-atomic/reshow/issues/118#issuecomment-1203255559
 *
 * @param {object|undefined|null} obj
 * @param {?string=} key
 * @returns {boolean}
 */
export const HAS = (obj, key) =>
  !!(obj && Object.prototype.hasOwnProperty.call(obj, key));

// reshow specific
export const REAL_TIME_URL = "--rtime-url--";
export const REAL_TIME_DATA_KEY = "--rtime-data--";
