import { expect } from "chai";
import { render, cleanIt, getSinon } from "reshow-unit";

import useLoaded from "../useLoaded";

describe("test useLoaded", () => {
  afterEach(() => {
    cleanIt();
  });

  it("basic test", async () => {
    const spy = getSinon().spy();
    const Comp = () => {
      const hello = useLoaded(spy);
      return <div>{hello ? "hello" : null}</div>;
    };
    render(<Comp />);
    expect(spy.getCall(0).firstArg).to.be.false;
    expect(spy.lastCall.firstArg).to.be.true;
  });
});
