import { KEYS } from "reshow-constant";
export default function _iterableToArrayLimit(arr, i) {
  const _arr = [];
  KEYS(arr).some((key, j) => {
    _arr.push(arr[key]);
    if (i === j + 1) {
      return true;
    }
  });
  return _arr;
}
