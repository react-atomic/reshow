import { T_UNDEFINED, T_NULL } from "reshow-constant";

const get = (object, property, receiver) => {
  if (object === T_NULL) {
    object = Function.prototype;
  }
  var desc = Object.getOwnPropertyDescriptor(object, property);
  if (desc === T_UNDEFINED) {
    var parent = Object.getPrototypeOf(object);
    if (parent === T_NULL) {
      return T_UNDEFINED;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === T_UNDEFINED) {
      return T_UNDEFINED;
    }
    return getter.call(receiver);
  }
};

export default get;
