import typeIs from '../getTypeOf'

var _typeof =
  typeof Symbol === 'function' && typeIs(Symbol.iterator) === 'symbol'
    ? function(obj) {
        return ('symbol'===typeIs(obj)) ? 'symbol' : typeIs(obj, 'object');
      }
    : function(obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeIs(obj, 'object');
      };

export default _typeof;
