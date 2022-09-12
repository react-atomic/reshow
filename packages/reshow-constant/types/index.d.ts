export const DEFAULT: "default";
export const FUNCTION: "function";
export const NUMBER: "number";
export const OBJECT: "object";
export const STRING: "string";
export const SYMBOL: "symbol";
export const SCRIPT: "script";
export const UNDEFINED: "undefined";
export const TYPE_ERROR: "TypeError";
/**
 * @type undefined
 */
export const T_UNDEFINED: undefined;
export const T_NULL: any;
export const T_TRUE: true;
export const T_FALSE: false;
export const KEYS: (o: object) => string[];
export const IS_ARRAY: (arg: any) => arg is any[];
export function OBJ_SIZE(o: object): number;
export function NEW_OBJ(): object;
export function HAS(obj: object, key: string): boolean;
export const REAL_TIME_URL: "--rtime-url--";
export const REAL_TIME_DATA_KEY: "--rtime-data--";
