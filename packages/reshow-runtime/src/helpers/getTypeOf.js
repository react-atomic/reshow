import {STRING, OBJECT, FUNCTION, UNDEFINED} from 'reshow-constant';
const types =
  '|number|boolean|' +
  STRING +
  '|' +
  OBJECT +
  '|' +
  FUNCTION +
  '|' +
  UNDEFINED +
  '|';

/**
 * Do not use this.
 * The class name not reliable after code compress.
 */

const toBase = (type, name) => {
  if (-1 === types.indexOf('|' + type + '|')) {
    if (!name) {
      name = type;
    }
    return name;
  } else {
    return type;
  }
};

const getTypeIs = (val, name) => {
  const type = Object.prototype.toString
    .call(val)
    .replace(/^\[object\s(.*)\]$/, '$1')
    .toLowerCase();
  return toBase(type, name);
};

const getTypeOf = (val, name) => {
  if (null == val) {
    return getTypeIs(val, name);
  }
  try {
    const type = Object.getPrototypeOf(val).constructor.name.toLowerCase();
    return toBase(type, name);
  } catch (ex) {
    return getTypeIs(val, name);
  }
};

export default getTypeOf;
