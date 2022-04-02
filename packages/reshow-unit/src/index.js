import {
  jsdom,
  cleanIt as domCleanIt,
  hideConsoleError,
} from "reshow-unit-dom";
import { doc } from "win-doc";
import { getTimestamp } from "get-random-id";

import {
  act as rtlAct,
  render as rtlRender,
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

const act = async (cb, milliseconds = 0, debug) => {
  const start = getTimestamp();
  let timer;
  const wait = (resolve) => {
    const now = getTimestamp();
    debug && console.log({ start, now }, now - start);
    if (milliseconds + start > now) {
      clearTimeout(timer);
      timer = setTimeout(() => wait(resolve), 10);
    } else {
      resolve();
    }
  };
  await rtlAct(
    () =>
      new Promise((resolve, reject) => {
        cb();
        wait(resolve);
      })
  );
};

// rtl-render: https://github.com/testing-library/react-testing-library/blob/main/src/pure.js
const render = (...p) => {
  const result = rtlRender(...p);
  const html = () => result.container.innerHTML;
  result.html = html;
  return result;
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
