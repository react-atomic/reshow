export default useLongPress;
export type LongPressPayload = {
    threshold?: number;
    onStart?: Function;
    onCancel?: Function;
};
/**
 * @typedef {object} LongPressPayload
 * @property {number} [threshold]
 * @property {Function} [onStart]
 * @property {Function} [onCancel]
 */
/**
 * @param {Function} callback
 * @param {LongPressPayload} payload
 */
declare function useLongPress(callback: Function, payload?: LongPressPayload): {
    onTouchStart: () => void;
    onTouchEnd: () => void;
    onMouseDown: () => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
};
