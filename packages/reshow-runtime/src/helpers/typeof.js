import typeIs from '../getTypeOf';

const _typeof =
  typeof Symbol === 'function' && typeIs(Symbol.iterator) === 'symbol'
    ? obj => {
        return 'symbol' === typeIs(obj) ? 'symbol' : typeIs(obj, 'object');
      }
    : obj =>
        obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
          ? 'symbol'
          : typeIs(obj, 'object');

export default _typeof;
