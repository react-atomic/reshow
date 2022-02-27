import { FUNCTION, UNDEFINED } from "reshow-constant";
export default function _isNativeReflectConstruct() {
  if (typeof Reflect === UNDEFINED || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === FUNCTION) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
