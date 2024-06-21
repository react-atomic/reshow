/**
 * @template T
 * @typedef {React.Dispatch<React.SetStateAction<T>>} SetStateAction
 */
/**
 * @template T
 * @typedef {[T, SetStateAction<T>]} useState
 */
/**
 * Basic type
 */
export const FUNCTION: "function";
export const NUMBER: "number";
export const OBJECT: "object";
export const STRING: "string";
/**
 * @typedef {T_UNDEFINED|T_NULL|T_FALSE|0} SAFE_UNDEFINED
 */
/**
 * @type undefined
 */
export const T_UNDEFINED: undefined;
/**
 * @type null
 */
export const T_NULL: null;
export const T_TRUE: true;
export const T_FALSE: false;
export const DEFAULT: "default";
export const SYMBOL: "symbol";
export const SCRIPT: "script";
export const UNDEFINED: "undefined";
export const TYPE_ERROR: "TypeError";
export const KEYS: (o: object) => string[];
export const IS_ARRAY: (arg: any) => arg is any[];
export function OBJ_SIZE(o?: (object | (string | null)) | undefined): number;
export function NEW_OBJ(): any;
export function HAS(obj: object | undefined | null, key: string): boolean;
export const REAL_TIME_URL: "--rtime-url--";
export const REAL_TIME_DATA_KEY: "--rtime-data--";
export type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;
export type useState<T> = [T, SetStateAction<T>];
export type SAFE_UNDEFINED = undefined | null | false | 0;
