import { expect } from "chai";
import { render, unmount, cleanIt } from "reshow-unit";

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
    render(<Foo />);
    expect(hackGlobal()).to.be.true;
    unmount();
    expect(hackGlobal()).to.be.false;
  });
});
