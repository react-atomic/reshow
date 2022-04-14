import arrayWithHoles from "./arrayWithHoles.js";
import iterableToArrayLimit from "./iterableToArrayLimit.js";
import nonIterableRest from "./nonIterableRest.js";
export default function _slicedToArray(arr, i) {
  return (
    arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest()
  );
}
