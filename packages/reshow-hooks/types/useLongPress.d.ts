export default useLongPress;
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
declare function useLongPress(callback: Function, payload?: LongPressPayload): any;
