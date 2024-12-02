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
 * @property {Coordinate} startPos
 * @property {Coordinate} endPos
 */

/**
 * @typedef {object} Coordinate
 * @property {number} x
 * @property {number} y
 */

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
    startTime: 0,
    bTracking: false,
    startPos: { x: 0, y: 0 },
    endPos: { x: 0, y: 0 },
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
      lastState.current.startPos.x = clientX;
      lastState.current.startPos.y = clientY;
    },
    gestureEnd: () => {
      const {
        callback,
        thresholdTime,
        thresholdDistance,
        startPos,
        endPos,
        startTime,
      } = lastState.current;
      lastState.current.bTracking = false;
      /**
       * @type {DirectionType?}
       */
      let direction;
      const now = new Date().getTime();
      const deltaTime = now - startTime;
      const deltaX = endPos.x - startPos.x;
      const deltaY = endPos.y - startPos.y;
      /* work out what the movement was */
      if (deltaTime > thresholdTime) {
        /* gesture too slow */
        return;
      } else {
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
        lastState.current.endPos.x = clientX;
        lastState.current.endPos.y = clientY;
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
