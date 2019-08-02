import _defaults from './defaults';
const setProtoOf = (obj, proto) => {
  obj.__proto__ = proto;
  return obj;
};

export default function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    ({__proto__: []} instanceof Array ? setProtoOf : (o, p) => {_defaults(o, p); setProtoOf(o, p); });

  return _setPrototypeOf(o, p);
}
