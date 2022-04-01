import {
  jsdom,
  cleanIt as domCleanIt,
  hideConsoleError,
} from "reshow-unit-dom";
import { doc } from "win-doc";

// rtl-render: https://github.com/testing-library/react-testing-library/blob/main/src/pure.js
import {
  render,
  cleanup,
  getQueriesForElement,
  queries,
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

export { render, screen, cleanIt, jsdom, hideConsoleError };
