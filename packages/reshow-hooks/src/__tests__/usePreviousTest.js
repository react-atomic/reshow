import { useState } from "react";
import { expect } from "chai";
import { render, act, cleanIt, getSinon as sinon } from "reshow-unit";

import usePrevious from "../usePrevious";

describe("test usePrevious", () => {
  afterEach(() => cleanIt());

  it("basic test", async () => {
    let hackGlobal;
    let i = 0;
    const expectedPrev = [undefined, undefined, "foo", "bar"];

    const FOO = (props) => {
      const prev = usePrevious(props.v);
      expect(prev).to.equal(expectedPrev[i++]);
      hackGlobal = () => {
        return { v: props.v, prev };
      };
      return null;
    };

    let gSet;
    const Comp = (props) => {
      const [state, setState] = useState("foo");
      gSet = setState;
      return <FOO v={state} />;
    };

    render(<Comp />);
    expect(hackGlobal(), 1).to.deep.equal({ v: "foo", prev: undefined });
    await act(() => {
      gSet("bar");
    });
    expect(hackGlobal(), 2).to.deep.equal({ v: "bar", prev: "bar" });
  });

  it("test call times", async () => {
    const spy = sinon().spy();
    const FOO = ({ v }) => {
      const prev = usePrevious(v);
      if (v !== prev) {
        spy();
      }
      return null;
    };

    let gSet;
    const Comp = (props) => {
      const [state, setState] = useState("foo");
      gSet = setState;
      return <FOO v={state} />;
    };

    await render(<Comp />);
    expect(spy.callCount <= 2).to.be.true;
    await act(() => {
      gSet("bar");
    });
    expect(spy.callCount <= 3).to.be.true;
  });

  it("test call times with init", async () => {
    const spy = sinon().spy();
    const FOO = ({ v }) => {
      const prev = usePrevious(v, "foo");
      if (v !== prev) {
        spy();
      }
      return null;
    };

    let gSet;
    const Comp = (props) => {
      const [state, setState] = useState("foo");
      gSet = setState;
      return <FOO v={state} />;
    };

    await render(<Comp />);
    expect(spy.callCount === 0).to.be.true;
  });
});
