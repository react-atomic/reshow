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
    onTouchStart: (e: React.MouseEvent) => void;
    onTouchEnd: () => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
};
