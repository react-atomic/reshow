const getTypeOf = (val, name) => {
  if (Number.isNaN(val)) {
    return 'NaN';
  }
  try {
    if (!name) {
      name = Object.getPrototypeOf(val).constructor.name.toLowerCase();
    }
    return name
  } catch (ex) {
    return Object.prototype.toString
      .call(val)
      .replace(/^\[object\s(.*)\]$/, '$1')
      .toLowerCase();
  }
};

export default getTypeOf;
