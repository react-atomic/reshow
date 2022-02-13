import defineProperty from "./defineProperty";
import typeIs from "./getTypeOf";
import { FUNCTION, KEYS } from "reshow-constant";

export default function _objectSpread(target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = KEYS(source);

    if (typeIs(Object.getOwnPropertySymbols) === FUNCTION) {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}
