export default useRefUpdate;
/**
 * @template ValueType
 * @param {ValueType|function():ValueType} [value]
 * @param {function(ValueType):ValueType} [cookCb]
 * @return {React.MutableRefObject<ValueType|undefined>}
 */
declare function useRefUpdate<ValueType>(value?: ValueType | (() => ValueType), cookCb?: (arg0: ValueType) => ValueType): React.MutableRefObject<ValueType | undefined>;
