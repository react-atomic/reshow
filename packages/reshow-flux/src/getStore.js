import callfunc from "call-func";
import get from "get-object-value";

const storeLocator = (props) => props?.store || get(props, ["stores", 0]);

const getStore = ({ props, options }) => {
  const allProps = { ...options, ...props };
  const store = callfunc(options?.storeLocator || storeLocator, [allProps]);
  if (!store) {
    throw "Need defined store. such as store={your-storee}";
  }
  return { store, allProps };
};

export default getStore;
