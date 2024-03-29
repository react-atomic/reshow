export default useRefUpdate;
/**
 * @template ValueType
 * @param {ValueType|function():ValueType} [value]
 * @return {React.MutableRefObject<ValueType|undefined>}
 */
declare function useRefUpdate<ValueType>(value?: ValueType | (() => ValueType)): import("react").MutableRefObject<ValueType>;
