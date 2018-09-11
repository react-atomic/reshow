import checkType from './getTypeOf'

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  const isObject = 'object' === checkType(call)
  return call && (isObject || typeof call === 'function')
    ? call
    : self;
}

export default _possibleConstructorReturn
