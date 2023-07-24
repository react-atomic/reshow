// @ts-check

import { useMemo, useRef } from "react";
import useTimer from "./useTimer";
import callfunc from "call-func";

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
const useLongPress = (callback, payload = {}) => {
  const lastPayload = useRef(payload);
  lastPayload.current = { ...lastPayload.current, ...payload };
  const [timerRun, timerStop] = useTimer();

  return useMemo(() => {
    const start = () => {
      const { threshold = 500, onStart } = lastPayload.current;
      callfunc(onStart);
      timerRun(() => {
        callfunc(callback);
      }, threshold);
    };
    const cancel = () => {
      const { onCancel } = lastPayload.current;
      timerStop();
      callfunc(onCancel);
    };

    const mouseHandlers = {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
    };

    const touchHandlers = {
      onTouchStart: start,
      onTouchEnd: cancel,
    };
    return {
      ...mouseHandlers,
      ...touchHandlers,
    };
  }, [callback]);
};
export default useLongPress;
