import { NUMBER, UNDEFINED, T_NULL, IS_ARRAY } from "reshow-constant";

import unsupportedIterableToArray, {
  NonIterableError,
} from "./unsupportedIterableToArray.js";
import typeIs from "./getTypeOf.js";

export default function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeIs(Symbol) === UNDEFINED || o[Symbol.iterator] == T_NULL) {
    if (
      IS_ARRAY(o) ||
      (it = unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeIs(o.length) === NUMBER)
    ) {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length)
            return {
              done: true,
            };
          return {
            done: false,
            value: o[i++],
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }

    throw new TypeError(NonIterableError);
  }

  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}
