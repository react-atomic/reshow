import callfunc from "call-func";

const storeLocator = (props) => props?.stores;

const isArray = Array.isArray;

const getStores = (props) => {
  const result = callfunc(props?.storeLocator || storeLocator, [props]);
  return isArray(result) ? result : [result];
}

export default getStores;
