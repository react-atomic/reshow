import typeIs from './getTypeOf';
import {SYMBOL, OBJECT} from 'reshow-constant';

const _typeof = o => SYMBOL === typeIs(o) ? SYMBOL : typeIs(o, OBJECT);

export default _typeof;
