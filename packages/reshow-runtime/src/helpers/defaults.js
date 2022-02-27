import { T_UNDEFINED } from "reshow-constant";
export default function _defaults(obj, defaults) {
  var keys = Object.getOwnPropertyNames(defaults);

  for (var i = 0, j = keys.length; i < j; i++) {
    var key = keys[i];
    var value = Object.getOwnPropertyDescriptor(defaults, key);

    if (value && value.configurable && obj[key] === T_UNDEFINED) {
      Object.defineProperty(obj, key, value);
    }
  }

  return obj;
}
