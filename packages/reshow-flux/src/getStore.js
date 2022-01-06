import callfunc from "call-func";

const storeLocator = (props) => props?.stores[0] || props?.store;

const getStore = ({ props, options }) => {
  const allProps = { ...options, ...props };
  const store = callfunc(allProps?.storeLocator || storeLocator, [allProps]);
  if (!store) {
    throw "Need defined stores. such as store={your-storee}";
  }
  return { store, allProps };
};

export default getStore;
