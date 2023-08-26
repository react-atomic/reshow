//@ts-check
import useRefWithInitCallback from "./useRefWithInitCallback";
import callfunc from "call-func";

/**
 * @param {boolean|undefined} onlyDiff
 * @param {{current: {prev: any, cur: any}|undefined}} data
 * @param {any} value
 */
const handleOnlyDiff = (onlyDiff, data, value) => {
  if (onlyDiff) {
    if (data.current?.cur !== value) {
      return data.current?.cur;
    } else {
      return data.current?.prev;
    }
  } else {
    return data.current?.cur;
  }
};

/**
 * Check more info
 * https://beta.reactjs.org/learn/you-might-not-need-an-effect?#adjusting-some-state-when-a-prop-changes
 * @param {any} value
 * @param {any} [init]
 * @param {{isLazy?: boolean, onlyDiff?: boolean}} [options]
 */
const usePrevious = (value, init, options = {}) => {
  const data = useRefWithInitCallback(() => {
    return { cur: callfunc(init), prev: null };
  });
  data.current = {
    prev: handleOnlyDiff(options.onlyDiff, data, value),
    cur: value,
  };
  return options.isLazy ? () => data.current?.prev : data.current?.prev;
};

export default usePrevious;
