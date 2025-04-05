export default useRefWithInitCallback;
/**
 * @template ValueType
 * @param {ValueType|function():ValueType} [value]
 * @return {React.Ref<ValueType|undefined>}
 */
declare function useRefWithInitCallback<ValueType>(value?: ValueType | (() => ValueType)): React.Ref<ValueType | undefined>;
