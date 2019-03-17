import typeIs from './getTypeOf';
import {FUNCTION, SYMBOL, OBJECT} from 'reshow-constant';

const _typeof =
  typeIs(Symbol) === FUNCTION && typeIs(Symbol.iterator) === SYMBOL
    ? obj => {
        return SYMBOL === typeIs(obj) ? SYMBOL : typeIs(obj, OBJECT);
      }
    : obj =>
        obj &&
        typeIs(Symbol) === FUNCTION &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
          ? SYMBOL
          : typeIs(obj, OBJECT);

export default _typeof;
