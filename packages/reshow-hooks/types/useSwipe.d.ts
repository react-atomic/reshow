export function useSwipe({ thresholdTime, thresholdDistance, callback, }: UseSwipeProps): {
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
};
export type UnifyTouchEvent = React.TouchEvent | React.MouseEvent;
export type DirectionType = "up" | "right" | "down" | "left";
export type UseSwipeProps = {
    thresholdTime?: number | undefined;
    thresholdDistance?: number | undefined;
    /**
     * =defaultCallback
     */
    callback: (arg0: DirectionType) => void;
};
export type UseSwipeState = {
    thresholdTime: number;
    thresholdDistance: number;
    /**
     * =defaultCallback
     */
    callback: (arg0: DirectionType) => void;
    startTime: number;
    bTracking: boolean;
    startPos: Coordinate;
    endPos: Coordinate;
};
export type Coordinate = {
    x: number;
    y: number;
};
