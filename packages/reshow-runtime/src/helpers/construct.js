import { FUNCTION, UNDEFINED } from "reshow-constant";

import setPrototypeOf from "./setPrototypeOf";
import typeIs from "./getTypeOf";

function isNativeReflectConstruct() {
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

export default function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}
