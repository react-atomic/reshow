const toConsumableArray = arr => {
  if (Array.isArray(arr) || !Array.from) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
};

export default toConsumableArray;