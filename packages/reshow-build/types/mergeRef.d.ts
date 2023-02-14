export function mergeRef(el: Element, refArr?: RefCbType[]): void;
export type RefCbType = import("react").MutableRefObject<any> | Function;
export type Element = React.ReactElement | HTMLElement;
