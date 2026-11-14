import * as React from "react";
export type UnifyTouchEvent = React.TouchEvent | React.MouseEvent;
export type DirectionType = "up" | "right" | "down" | "left";
export type UseSwipeProps = {
    thresholdTime?: number | undefined;
    thresholdDistance?: number | undefined;
    callback?: (direction: DirectionType) => void;
};
export type UseSwipeState = {
    thresholdTime: number;
    thresholdDistance: number;
    callback: (direction: DirectionType) => void;
    startTime: number;
    bTracking: boolean;
    startPosX: number | null;
    startPosY: number | null;
    endPosX: number | null;
    endPosY: number | null;
};
/**
 * @param {UseSwipeProps} props
 */
export declare const useSwipe: ({ thresholdTime, thresholdDistance, callback, }: UseSwipeProps) => {
    /**
     * @type {React.MouseEventHandler}
     */
    onMouseDown: React.MouseEventHandler;
    /**
     * @type {React.MouseEventHandler}
     */
    onMouseUp: React.MouseEventHandler;
    /**
     * @type {React.MouseEventHandler}
     */
    onMouseMove: React.MouseEventHandler;
    /**
     * @type {React.TouchEventHandler}
     */
    onTouchStart: React.TouchEventHandler;
    /**
     * @type {React.TouchEventHandler}
     */
    onTouchEnd: React.TouchEventHandler;
    /**
     * @type {React.TouchEventHandler}
     */
    onTouchMove: React.TouchEventHandler;
};
