import { useEffect, useRef } from "react";

/**
 * Check more info
 * https://beta.reactjs.org/learn/you-might-not-need-an-effect?#adjusting-some-state-when-a-prop-changes
 */
const usePrevious = (value) => {
  const prevValue = useRef();
  useEffect(() => {
    prevValue.current = value;
  }, [value]);
  return prevValue.current;
};

export default usePrevious;
