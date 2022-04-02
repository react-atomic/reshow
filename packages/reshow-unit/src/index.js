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
const getRoleHtml = (role) => screen().getByRole(role).outerHTML;

const cleanIt = (props) => {
  const { withoutJsdom } = props || {};
  if (!withoutJsdom) {
    domCleanIt();
  }
  cleanup();
};

const act = async (cb, milliseconds = 1, debug) => {
  const start = getTimestamp();
  let timer;
  const wait = (resolve) => {
    const now = getTimestamp();
    debug && console.log({ debug, start, now }, now - start);
    if (milliseconds + start > now) {
      clearTimeout(timer);
      timer = setTimeout(() => wait(resolve), 1);
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
let gRenderObj;
const render = (...p) => {
  const result = rtlRender(...p);
  const html = () => result.container.innerHTML;
  result.html = html;
  gRenderObj = result;
  return result;
};
const unmount = () => gRenderObj.unmount();

export {
  waitFor,
  waitForElementToBeRemoved,
  act,
  render,
  screen,
  getRoleHtml,
  cleanIt,
  unmount,
  jsdom,
  hideConsoleError,
};
