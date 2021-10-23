import { useEffect, useRef, useMemo } from "react";
import callfunc from "call-func";

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
      timer.current = null;
    }
  };

  useEffect(() => () => stop(), []);

  const run = (func, delay) => {
    timer.current = callfunc(act.run, [func, delay]);
  };

  return [run, stop];
};

export default useTimer;
