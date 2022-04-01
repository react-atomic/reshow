import {
  jsdom,
  cleanIt as domCleanIt,
  hideConsoleError,
} from "reshow-unit-dom";
import { doc } from "win-doc";

// rtl-render: https://github.com/testing-library/react-testing-library/blob/main/src/pure.js
import {
  act as rtlAct,
  render,
  cleanup,
  getQueriesForElement,
  queries,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// https://github.com/testing-library/react-testing-library/issues/1025
global.IS_REACT_ACT_ENVIRONMENT = true;
// https://testing-library.com/docs/queries/about/#screen
const screen = () => getQueriesForElement(doc(), queries);

const cleanIt = (props) => {
  const { withoutJsdom } = props || {};
  if (!withoutJsdom) {
    domCleanIt();
  }
  cleanup();
};

const act = async (cb, milliseconds) => {
  await rtlAct(
    () =>
      new Promise((resolve, reject) => {
        cb();
        setTimeout(resolve, milliseconds || 0);
      })
  );
};

export {
  waitFor,
  waitForElementToBeRemoved,
  act,
  render,
  screen,
  cleanIt,
  jsdom,
  hideConsoleError,
};
