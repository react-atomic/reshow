// @ts-check

import build from "../index";
import { expect } from "chai";
import { render } from "reshow-unit";

describe("Test build Empty", () => {
  [null, undefined].forEach((input) => {
    it(`Test ${input}`, () => {
      const actual = build(input)();
      expect(actual).to.be.null;
    });
  });
  [[], "", true, false].forEach((input) => {
    it(`Test ${JSON.stringify(input)}`, () => {
      const actual = /**@type React.ReactElement*/ (build(true)());
      const wrap = render(actual);
      expect(wrap.html()).to.equal("<span></span>");
    });
  });
});
