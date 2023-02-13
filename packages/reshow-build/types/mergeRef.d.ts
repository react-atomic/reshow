export default mergeRef;
export type RefCbType = import("react").MutableRefObject<any> | Function;
/**
 * @param {React.ReactElement} el
 * @param {RefCbType[]} refArr
 */
declare function mergeRef(el: React.ReactElement, refArr?: RefCbType[]): void;
