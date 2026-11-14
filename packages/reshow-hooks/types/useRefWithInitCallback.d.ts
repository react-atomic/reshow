import * as React from "react";
/**
 * @template ValueType
 * @param {ValueType|(() => ValueType)} [value]
 * @return {React.MutableRefObject<ValueType|undefined>}
 */
declare const useRefWithInitCallback: <ValueType>(value?: ValueType | (() => ValueType)) => React.MutableRefObject<ValueType | undefined>;
export default useRefWithInitCallback;
