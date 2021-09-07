import React from "react";
import build from "reshow-build";
import { returnOptions, getReturn } from "reshow-return";
import { useConnect } from "reshow-flux";
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
};

const defaultProps = {
  initStates,
  pathStates,
  storeLocator,
  useConnect: useConnect(myReturnOptions),
};

const ReshowReturn = getReturn({
  defaultProps,
  displayName: "ReshowReturn",
});

export {
  defaultProps,
  myReturnOptions as returnOptions,
  ReshowReturn as Return,
};
