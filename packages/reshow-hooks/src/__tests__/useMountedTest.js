import React from "react";
import { expect } from "chai";
import { mount, cleanIt } from "reshow-unit";

import useMounted from "../useMounted";

describe("test useMounted", () => {
  afterEach(() => {
    cleanIt();
  });
  it("basic test", () => {
    let hackGlobal;
    const Foo = () => {
      hackGlobal = useMounted();
      return null;
    };
    const wrap = mount(<Foo />);
    expect(hackGlobal()).to.be.true;
    wrap.unmount();
    expect(hackGlobal()).to.be.false;
  });
});
