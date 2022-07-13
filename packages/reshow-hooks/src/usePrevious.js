import { useRef } from "react";

/**
 * Check more info
 * https://beta.reactjs.org/learn/you-might-not-need-an-effect?#adjusting-some-state-when-a-prop-changes
 */
const usePrevious = (value, init) => {
  const data = useRef({cur: init});
  data.current = {
    prev: data.current.cur,
    cur: value,
  };
  return data.current.prev;
};

export default usePrevious;
