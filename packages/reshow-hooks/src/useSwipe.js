// @ts-check

import { useRef } from "react";
import get from "get-object-value";

/**
 * @typedef {React.TouchEvent|React.MouseEvent} UnifyTouchEvent
 */

/**
 * @param {UnifyTouchEvent} e
 * @returns {MouseEvent}
 */
const unifyTouch = (e) => get(e, ["changedTouches", 0], e);

/**
 * @typedef {UP|RIGHT|DOWN|LEFT} DirectionType
 */
const UP = "up";
const RIGHT = "right";
const DOWN = "down";
const LEFT = "left";

/**
 * @type {Record<"UP"|"RIGHT"|"DOWN"|"LEFT", DirectionType>}
 */
const Directions = {
  UP,
  RIGHT,
  DOWN,
  LEFT,
};

const defaultThresholdTime = 500;
const defaultThresholdDistance = 100;
const defaultCallback = (/**@type DirectionType*/ _bDirection) => {};

/**
 * @typedef {object} UseSwipeProps
 * @property {number=} thresholdTime
 * @property {number=} thresholdDistance
 * @property {function(DirectionType):void} callback=defaultCallback
 */

/**
 * @typedef {object} UseSwipeState
 * @property {number} thresholdTime
 * @property {number} thresholdDistance
 * @property {function(DirectionType):void} callback=defaultCallback
 * @property {number} startTime
 * @property {boolean} bTracking
 * @property {number?} startPosX
 * @property {number?} startPosY
 * @property {number?} endPosX
 * @property {number?} endPosY
 */

const resetSwipState = {
  startTime: 0,
  bTracking: false,
  startPosX: null,
  startPosY: null,
  endPosX: null,
  endPosY: null,
};

/**
 * @param {UseSwipeProps} props
 */
export const useSwipe = ({
  thresholdTime = defaultThresholdTime,
  thresholdDistance = defaultThresholdDistance,
  callback = defaultCallback,
}) => {
  /**
   * @type {React.MutableRefObject<UseSwipeState>}
   */
  const lastState = useRef({
    thresholdDistance,
    thresholdTime,
    callback,
    ...resetSwipState,
  });
  lastState.current = {
    ...lastState.current,
    thresholdDistance,
    thresholdTime,
    callback,
  };

  const handler = {
    gestureStart: (/**@type UnifyTouchEvent*/ e) => {
      const { clientX, clientY } = unifyTouch(e);
      lastState.current.bTracking = true;
      /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
      lastState.current.startTime = new Date().getTime();
      lastState.current.startPosX = clientX;
      lastState.current.startPosY = clientY;
    },
    gestureEnd: () => {
      const {
        callback,
        thresholdTime,
        thresholdDistance,
        startPosX,
        startPosY,
        endPosX,
        endPosY,
        startTime,
      } = lastState.current;
      lastState.current.bTracking = false;
      /**
       * @type {DirectionType?}
       */
      let direction;
      const now = new Date().getTime();
      const deltaTime = now - startTime;
      lastState.current = {
        ...lastState.current,
        ...resetSwipState,
      };

      /* work out what the movement was */
      if (
        deltaTime > thresholdTime ||
        null == endPosX ||
        null == endPosY ||
        null == startPosX ||
        null == startPosY
      ) {
        /* gesture too slow */
        return;
      } else {
        const deltaX = endPosX - startPosX;
        const deltaY = endPosY - startPosY;
        if (
          deltaX > thresholdDistance &&
          Math.abs(deltaY) < thresholdDistance
        ) {
          direction = Directions.RIGHT;
        } else if (
          -deltaX > thresholdDistance &&
          Math.abs(deltaY) < thresholdDistance
        ) {
          direction = Directions.LEFT;
        } else if (
          deltaY > thresholdDistance &&
          Math.abs(deltaX) < thresholdDistance
        ) {
          direction = Directions.DOWN;
        } else if (
          -deltaY > thresholdDistance &&
          Math.abs(deltaX) < thresholdDistance
        ) {
          direction = Directions.UP;
        } else {
          direction = null;
        }
        if (null != direction) {
          callback(direction);
        }
      }
    },
    gestureMove: (/**@type UnifyTouchEvent*/ e) => {
      if (lastState.current.bTracking) {
        const { clientX, clientY } = unifyTouch(e);
        lastState.current.endPosX = clientX;
        lastState.current.endPosY = clientY;
      }
    },
  };
  const mouseHandlers = {
    /**
     * @type {React.MouseEventHandler}
     */
    onMouseDown: handler.gestureStart,
    /**
     * @type {React.MouseEventHandler}
     */
    onMouseUp: handler.gestureEnd,
    /**
     * @type {React.MouseEventHandler}
     */
    onMouseMove: handler.gestureMove,
  };

  const touchHandlers = {
    /**
     * @type {React.TouchEventHandler}
     */
    onTouchStart: handler.gestureStart,
    /**
     * @type {React.TouchEventHandler}
     */
    onTouchEnd: handler.gestureEnd,
    /**
     * @type {React.TouchEventHandler}
     */
    onTouchMove: handler.gestureMove,
  };
  return {
    ...mouseHandlers,
    ...touchHandlers,
  };
};
