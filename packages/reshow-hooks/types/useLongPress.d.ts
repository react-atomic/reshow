import * as React from "react";
export type LongPressPayload = {
    threshold?: number;
    onStart?: Function;
    onCancel?: Function;
};
export type LongPressExtraEvent = {
    currentItem: EventTarget;
};
export type LongPressEvent = LongPressExtraEvent & React.MouseEvent;
/**
 * @typedef {object} LongPressPayload
 * @property {number} [threshold]
 * @property {Function} [onStart]
 * @property {Function} [onCancel]
 */
/**
 * @typedef {object} LongPressExtraEvent
 * @property {EventTarget} currentItem
 */
/**
 * @typedef {LongPressExtraEvent & React.MouseEvent} LongPressEvent
 */
/**
 * @param {Function} callback
 * @param {LongPressPayload} payload
 */
declare const useLongPress: (callback: Function, payload?: LongPressPayload) => {
    onMouseDown: (e: LongPressEvent) => void;
    onMouseUp: (e: LongPressEvent) => void;
    onMouseMove: (e: LongPressEvent) => void;
    onTouchStart: (e: LongPressEvent) => void;
    onTouchMove: (e: LongPressEvent) => void;
};
export default useLongPress;
