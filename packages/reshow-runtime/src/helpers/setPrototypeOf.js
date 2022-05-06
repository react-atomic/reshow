/**
 * !! Important !! if update this file, need take care ie10 inherit
 */

import _defaults from "./defaults";

const setProtoOf = (obj, proto) => {
  obj.__proto__ = proto;
  return obj;
};

const setDefaults = (o, p) => setProtoOf(_defaults(o, p), p);

export default function setPrototypeOf(o, p, force) {
  const _setPrototypeOf =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && !force ? setProtoOf : setDefaults);

  return _setPrototypeOf(o, p);
}
