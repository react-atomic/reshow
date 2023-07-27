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
const useLongPress = (callback, payload = {}) => {
  const lastPayload = useRef(payload);
  const isStart = useRef(false);
  lastPayload.current = { ...lastPayload.current, ...payload };
  const [timerRun, timerStop] = useTimer();

  return useMemo(() => {
    const start = (/**@type LongPressEvent*/ e) => {
      if (e?.currentTarget) {
        e.currentItem = e.currentTarget;
      }
      if (isStart.current) {
        return;
      }
      isStart.current = true;
      const { threshold = 500, onStart } = lastPayload.current;
      callfunc(onStart, [e]);
      timerRun(() => {
        done();
        callfunc(callback, [e]);
      }, threshold);
    };

    const done = () => {
      isStart.current = false;
      timerStop();
    };

    const cancel = (/**@type LongPressEvent*/ e) => {
      done();
      if (!isStart.current) {
        return;
      }
      if (e?.currentTarget) {
        e.currentItem = e.currentTarget;
      }
      const { onCancel } = lastPayload.current;
      callfunc(onCancel, [e]);
    };

    const mouseHandlers = {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
    };

    const touchHandlers = {
      onTouchStart: start,
      onTouchMove: cancel,
    };

    return {
      ...mouseHandlers,
      ...touchHandlers,
    };
  }, [callback]);
};

export default useLongPress;
