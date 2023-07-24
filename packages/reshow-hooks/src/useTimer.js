//@ts-check

import { T_UNDEFINED } from "reshow-constant";
import { useEffect, useRef, useMemo } from "react";
import callfunc from "call-func";

/**
 * @param {boolean} [interval]
 * @returns {[Function, Function]}
 */
const useTimer = (interval) => {
  const timer = useRef();
  const act = useMemo(
    () =>
      interval
        ? { run: setInterval, stop: clearInterval }
        : { run: setTimeout, stop: clearTimeout },
    []
  );

  const stop = () => {
    if (timer.current) {
      callfunc(act.stop, [timer.current]);
      timer.current = T_UNDEFINED;
    }
  };

  useEffect(() => () => stop(), []);

  /**
   * @param {function} func
   * @param {number} [delay]
   */
  const run = (func, delay) => {
    stop();
    timer.current = callfunc(act.run, [func, delay]);
  };

  return [run, stop];
};

export default useTimer;
