import { returnOptions, ReturnComponent } from "reshow-return";
import { connectHook } from "reshow-flux";
import pageStore from "../../src/stores/pageStore";
import { globalStore } from "../../src/stores/globalStore";

const storeLocator = (props) => props.stores || [pageStore];
const globalStoreLocator = (props) => globalStore;
const initStates = ["data", "I18N"];
const pathStates = { I13N: ["data", "I13N"] };

const myReturnOptions = {
  ...returnOptions,
  defaultProps: {
    ...returnOptions.defaultProps,
    initStates,
    pathStates,
    storeLocator,
    globalStoreLocator,
  },
};

const MyReturn = connectHook(ReturnComponent, myReturnOptions);

export { myReturnOptions as returnOptions, MyReturn as Return };
