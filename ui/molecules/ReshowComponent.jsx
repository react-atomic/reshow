import { returnOptions, ReturnComponent } from "reshow-return";
import { connectHook } from "reshow-flux";
import pageStore from "../../src/stores/pageStore";
import { globalStore } from "../../src/stores/globalStore";

const storeLocator = (props) => props.stores || [pageStore];
const initStates = ["data", "I18N"];
const pathStates = { I13N: ["data", "I13N"] };

const myReturnOptions = {
  ...returnOptions,
  shouldComponentUpdate: () => {
    const thisThemePath = pageStore.getState().get("themePath");
    if (globalStore.path && globalStore.path !== thisThemePath) {
      return false;
    } else {
      return true;
    }
  },
  defaultProps: {
    ...returnOptions.defaultProps,
    initStates,
    pathStates,
    storeLocator,
  },
};

const MyReturn = connectHook(ReturnComponent, myReturnOptions);

export { myReturnOptions as returnOptions, MyReturn as Return };
