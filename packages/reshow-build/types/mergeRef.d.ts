export function mergeRef(el: Element | null, refArr?: RefType[]): void;
export type RefType = import("react").MutableRefObject<any> | Function | undefined;
export type Element = React.ReactElement | HTMLElement;
