import refError from "./refError.js";

export default function _assertThisInitialized(self) {
  if (self === void 0) {
    throw refError();
  }

  return self;
}
