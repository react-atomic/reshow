import { FUNCTION, UNDEFINED } from "reshow-constant";

import typeIs from "./getTypeOf.js";

export default function _isNativeReflectConstruct() {
  if (typeIs(Reflect) === UNDEFINED || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeIs(Proxy) === FUNCTION) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
