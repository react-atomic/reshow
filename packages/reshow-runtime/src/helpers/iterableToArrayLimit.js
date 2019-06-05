const keys = Object.keys;
export default function _iterableToArrayLimit(arr, i) {
  const _arr = [];
  keys(arr).some((key, j)=>{
    _arr.push(arr[key]);
    if (i === (j + 1)) {
      return true;
    }
  }); 
  return _arr;
}
