export function mergeRef(el: Element | null, refArr?: RefCbType[]): void;
export type RefCbType = import("react").MutableRefObject<any> | Function | undefined;
export type Element = React.ReactElement | HTMLElement;
