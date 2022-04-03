import { expect } from "chai";
import { render, cleanIt } from "reshow-unit";

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
    const wrap = render(<Foo />);
    expect(hackGlobal()).to.be.true;
    wrap.unmount();
    expect(hackGlobal()).to.be.false;
  });
});
