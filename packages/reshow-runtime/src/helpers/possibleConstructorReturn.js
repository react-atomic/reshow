import { OBJECT, FUNCTION } from "reshow-constant";

import typeIs from "./typeof.js";
import refError from "./refError.js";

export default function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw refError();
  }
  const isObject = OBJECT === typeIs(call);
  return call && (isObject || typeIs(call) === FUNCTION) ? call : self;
}
