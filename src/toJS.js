import memoize from 'memoize-one';
import {toJS as tojs} from 'get-object-value';

const toJS = data => tojs(data);
export default memoize(toJS);
