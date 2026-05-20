export function mergeRef(el: Element | null, refArr?: RefType[]): void;
export type RefType = React.RefObject<any> | Function | undefined;
export type Element = React.ReactElement | HTMLElement;
import * as React from "react";
