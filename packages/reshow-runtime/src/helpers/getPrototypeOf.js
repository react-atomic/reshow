export default function getPrototypeOf(o) {
  const _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : (o) => {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}
