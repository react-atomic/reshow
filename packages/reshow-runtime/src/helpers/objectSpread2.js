import { FUNCTION, KEYS } from "reshow-constant";
import defineProperty from "./defineProperty";
import typeIs from "./getTypeOf";

export default function _objectSpread2(target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    if (i % 2 || !Object.getOwnPropertyDescriptors) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = KEYS(source);

      if (typeIs(Object.getOwnPropertySymbols) === FUNCTION) {
        ownKeys = ownKeys.concat(
          Object.getOwnPropertySymbols(source).filter(function (sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }),
        );
      }

      ownKeys.forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    } else {
      Object.defineProperties(
        target,
        Object.getOwnPropertyDescriptors(arguments[i]),
      );
    }
  }

  return target;
}
