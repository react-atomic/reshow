import { FUNCTION } from "reshow-constant";

import setPrototypeOf from "./setPrototypeOf.js";
import typeIs from "./getTypeOf.js";

export default function _inherits(subClass, superClass) {
  if (typeIs(superClass) !== FUNCTION && superClass !== null) {
    throw new TypeError("Super must be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}
