export default useRefWithInitCallback;
/**
 * @template ValueType
 * @param {ValueType|function():ValueType} [value]
 * @return {React.MutableRefObject<ValueType|undefined>}
 */
declare function useRefWithInitCallback<ValueType>(value?: ValueType | (() => ValueType)): import("react").MutableRefObject<ValueType>;
