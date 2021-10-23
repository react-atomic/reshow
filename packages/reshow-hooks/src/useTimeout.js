import { useEffect, useRef } from "react";

const useTimeout = () => {
  const timer = useRef();

  const stop = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => () => stop(), []);

  const run = (func, delay) => {
    timer.current = setTimeout(func, delay);
  };

  return [run, stop];
};

export default useTimeout;
