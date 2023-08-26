// @ts-check

import * as React from "react";
const { useState } = React;
import { expect } from "chai";
import { render, act, waitFor, cleanIt, getSinon as sinon } from "reshow-unit";

import usePrevious from "../usePrevious";

describe("test usePrevious", () => {
  afterEach(() => cleanIt());

  it("basic test", async () => {
    const myspy = sinon().spy(() => {});
    let i = 0;
    const expectedPrev = [undefined, undefined, "foo", "bar"];

    const FOO = (/** @type {any}*/ props) => {
      const prev = usePrevious(props.v);
      expect(prev).to.equal(expectedPrev[i++]);
      if (prev !== props.v) {
        myspy(prev, props.v);
      }
      return null;
    };

    let gSet;
    const Comp = (/** @type {any}*/ _props) => {
      const [state, setState] = useState("foo");
      gSet = setState;
      return <FOO v={state} />;
    };

    render(<Comp />);
    await act(() => {
      gSet("bar");
    });
    await waitFor(() => {
      expect(myspy.firstCall.args, "firstCall").to.deep.equal([
        undefined,
        "foo",
      ]);
      expect(myspy.secondCall.args, "secondCall").to.deep.equal([
        undefined,
        "foo",
      ]);
      expect(myspy.thirdCall.args, "thirdCall").to.deep.equal(["foo", "bar"]);
    });
  });

  it("onlyDiff (true) test", async () => {
    const myspy = sinon().spy(() => {});
    const FOO = (/** @type {any}*/ props) => {
      const prev = usePrevious(props.v, undefined, { onlyDiff: true });
      myspy(prev, props.v);
      return null;
    };

    let gSet;
    const Comp = (/** @type {any}*/ _props) => {
      const [state, setState] = useState("foo");
      gSet = setState;
      return <FOO v={state} />;
    };
    render(<Comp />);
    await act(() => gSet("bar"));
    await act(() => gSet("bar"));
    await act(() => gSet("foo1"));
    await waitFor(() => {
      expect(myspy.args).to.deep.equal([
        [undefined, "foo"],
        [undefined, "foo"],
        ["foo", "bar"],
        ["foo", "bar"],
        ["bar", "foo1"],
        ["bar", "foo1"],
      ]);
    });
  });

  it("onlyDiff (false) test", async () => {
    const myspy = sinon().spy(() => {});
    const FOO = (/** @type {any}*/ props) => {
      const prev = usePrevious(props.v, undefined, { onlyDiff: false });
      myspy(prev, props.v);
      return null;
    };

    let gSet;
    const Comp = (/** @type {any}*/ _props) => {
      const [state, setState] = useState("foo");
      gSet = setState;
      return <FOO v={state} />;
    };
    render(<Comp />);
    await act(() => gSet("bar"));
    await act(() => gSet("bar"));
    await act(() => gSet("foo1"));
    await waitFor(() => {
      expect(myspy.args).to.deep.equal([
        [undefined, "foo"],
        [undefined, "foo"],
        ["foo", "bar"],
        ["bar", "bar"],
        ["bar", "foo1"],
        ["foo1", "foo1"],
      ]);
    });
  });

  it("test call times", async () => {
    const spy = sinon({}).spy();
    const FOO = ({ v }) => {
      const prev = usePrevious(v);
      if (v !== prev) {
        spy();
      }
      return null;
    };

    let gSet;
    const Comp = (/** @type {any}*/ _props) => {
      const [state, setState] = useState("foo");
      gSet = setState;
      return <FOO v={state} />;
    };

    render(<Comp />);
    expect(spy.callCount <= 2).to.be.true;
    await act(() => {
      gSet("bar");
    });
    expect(spy.callCount <= 3).to.be.true;
  });

  it("test call times with init", async () => {
    const spy = sinon({}).spy();
    const FOO = ({ v }) => {
      const prev = usePrevious(v, "foo");
      if (v !== prev) {
        spy();
      }
      return null;
    };

    const Comp = (/** @type {any}*/ _props) => {
      const [state] = useState("foo");
      return <FOO v={state} />;
    };

    render(<Comp />);
    expect(spy.callCount === 0).to.be.true;
  });
});
