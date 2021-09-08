import React from "react";
import build from "reshow-build";
import { connectOptions, getReturn } from "reshow-return";
import { useConnect } from "reshow-flux";
import pageStore from "../../src/stores/pageStore";
import { globalStore } from "../../src/stores/globalStore";

const storeLocator = (props) => props.stores || [pageStore];
const initStates = ["data", "I18N"];
const pathStates = { I13N: ["data", "I13N"] };

const myConnectOptions = {
  ...connectOptions,
  shouldComponentUpdate: () => {
    const thisThemePath = pageStore.getState().get("themePath");
    if (globalStore.path && globalStore.path !== thisThemePath) {
      return false;
    } else {
      return true;
    }
  },
  initStates,
  pathStates,
  storeLocator,
};

const ReshowReturn = getReturn({
  useConnect: useConnect(myConnectOptions),
  displayName: "ReshowReturn",
});

export { myConnectOptions as connectOptions, ReshowReturn as Return };
