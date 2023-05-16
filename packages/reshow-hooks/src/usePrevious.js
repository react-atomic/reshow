//@ts-check
import { useRef } from "react";

/**
 * Check more info
 * https://beta.reactjs.org/learn/you-might-not-need-an-effect?#adjusting-some-state-when-a-prop-changes
 * @param {any} value
 * @param {any} [init]
 */
const usePrevious = (value, init) => {
  const data = useRef({ cur: init, prev: null });
  data.current = {
    prev: data.current.cur,
    cur: value,
  };
  return data.current.prev;
};

export default usePrevious;
