const types = '|number|string|boolean|object|function|undefined|';

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

const getTypeOf = (val, name) => {
  let type;
  try {
    type = Object.getPrototypeOf(val).constructor.name.toLowerCase();
    return toBase(type, name);
  } catch (ex) {
    type = Object.prototype.toString
      .call(val)
      .replace(/^\[object\s(.*)\]$/, '$1')
      .toLowerCase();
    return toBase(type, name);
  }
};

export default getTypeOf;
