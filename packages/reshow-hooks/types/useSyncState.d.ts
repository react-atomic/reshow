export default useSyncState;
/**
 * @template AnyState
 * @param {any} initState
 * @param {function(function):any[]} [setter]
 * @returns {[AnyState, setSyncState, function():AnyState|undefined|null]}
 */
declare function useSyncState<AnyState>(initState: any, setter?: (arg0: Function) => any[]): [AnyState, (nextState: AnyState) => void, () => AnyState | undefined | null];
