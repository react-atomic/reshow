//@ts-check
import useRefInitCallback from "./useRefInitCallback";
import callfunc from "call-func";

/**
 * Check more info
 * https://beta.reactjs.org/learn/you-might-not-need-an-effect?#adjusting-some-state-when-a-prop-changes
 * @param {any} value
 * @param {any} [init]
 * @param {boolean} [isLazy]
 */
const usePrevious = (value, init, isLazy) => {
  const data = useRefInitCallback(() => {
    return { cur: callfunc(init), prev: null };
  });
  data.current = {
    prev: data.current?.cur,
    cur: value,
  };
  return isLazy ? () => data.current?.prev : data.current.prev;
};

export default usePrevious;
