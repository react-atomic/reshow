const getTypeOf = val => {
  if (Number.isNaN(val)) {
    return 'NaN';
  }
  try {
    return Object.getPrototypeOf(val).constructor.name;
  } catch (ex) {
    return Object.prototype.toString
      .call(val)
      .replace(/^\[object\s(.*)\]$/, '$1');
  }
}

export default getTypeOf;
