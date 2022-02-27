import { UNDEFINED, T_NULL } from "reshow-constant";
export default function _objectDestructuringEmpty(obj) {
  if (obj == T_NULL) throw new TypeError("Cannot destructure " + UNDEFINED);
}
