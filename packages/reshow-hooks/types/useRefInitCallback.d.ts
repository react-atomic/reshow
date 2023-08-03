export default useRefInitCallback;
/**
 * @template ValueType
 * @param {ValueType|function():ValueType} [value]
 * @return {React.MutableRefObject<ValueType|undefined>}
 */
declare function useRefInitCallback<ValueType>(value?: ValueType | (() => ValueType)): import("react").MutableRefObject<ValueType>;
