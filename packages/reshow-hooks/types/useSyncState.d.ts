/**
 * @template AnyState
 * @param {any} initState
 * @param {(init: () => any) => [any, function]} [setter]
 * @returns {[AnyState, (nextState: AnyState) => void, () => AnyState|undefined|null]}
 */
declare const useSyncState: <AnyState>(initState: any, setter?: (init: () => any) => [any, Function]) => [AnyState, (nextState: AnyState) => void, () => AnyState | undefined | null];
export default useSyncState;
