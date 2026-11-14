import * as React from "react";
/**
 * @template ValueType
 * @param {ValueType|(() => ValueType)} [value]
 * @param {(v: ValueType) => ValueType} [cookCb]
 * @return {React.MutableRefObject<ValueType>}
 */
declare const useRefUpdate: <ValueType>(value?: ValueType | (() => ValueType), cookCb?: (v: ValueType) => ValueType) => React.MutableRefObject<ValueType>;
export default useRefUpdate;
