import { HAS } from "reshow-constant";
const _extends =
  Object.assign ||
  function (target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
      const source = arguments[i];
      for (let key in source) {
        if (HAS(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

export default _extends;
