import { NUMBER, UNDEFINED, T_NULL, IS_ARRAY } from "reshow-constant";

import unsupportedIterableToArray, {
  NonIterableError,
} from "./unsupportedIterableToArray.js";
import typeIs from "./getTypeOf.js";

export default function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeIs(Symbol) === UNDEFINED || o[Symbol.iterator] == T_NULL) {
    if (
      IS_ARRAY(o) ||
      (it = unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeIs(o.length) === NUMBER)
    ) {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length)
          return {
            done: true,
          };
        return {
          done: false,
          value: o[i++],
        };
      };
    }

    throw new TypeError(NonIterableError);
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}
