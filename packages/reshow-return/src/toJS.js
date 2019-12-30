import {toJS} from 'get-object-value';
import memoize from 'memoize-one';
export default memoize(data => toJS(data));
