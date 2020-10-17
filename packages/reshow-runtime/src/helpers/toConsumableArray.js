const toConsumableArray = (arr) => {
  if (Array.isArray(arr) || !Array.from) {
    for (var i = 0, arr2 = Array(arr.length), j = arr.length; i < j; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
};

export default toConsumableArray;
