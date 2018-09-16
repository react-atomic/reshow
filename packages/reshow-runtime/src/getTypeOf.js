const types = '|number|string|boolean|object|function|undefined|';

/**
 * Do not use this.
 * The class name not reliable after code compress.
 */

const getTypeOf = (val, name) => {
  if (Number.isNaN(val)) {
    return 'NaN';
  }
  try {
    const type = Object.getPrototypeOf(val).constructor.name.toLowerCase();
    if (-1 === types.indexOf('|'+type+'|')) {
      if (!name) {
        name = type;
      }
      return name;
    } else {
      return type;
    }
  } catch (ex) {
    return Object.prototype.toString
      .call(val)
      .replace(/^\[object\s(.*)\]$/, '$1')
      .toLowerCase();
  }
};

export default getTypeOf;
