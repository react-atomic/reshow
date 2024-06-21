export default useRefWithInitCallback;
/**
 * @template ValueType
 * @param {ValueType|function():ValueType} [value]
 * @return {React.MutableRefObject<ValueType|undefined>}
 */
declare function useRefWithInitCallback<ValueType>(value?: ValueType | (() => ValueType)): React.MutableRefObject<ValueType | undefined>;
