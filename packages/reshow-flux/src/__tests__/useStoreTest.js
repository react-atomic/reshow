// @ts-check

import * as React from "react";
import { expect } from "chai";
import { act, render, waitFor } from "reshow-unit";
import { createReducer } from "reshow-flux-base";
import sinon from "sinon";

import useStore from "../useStore";
import ImmutableStore from "../ImmutableStore";

describe("useStore Test", () => {
  let reducer;
  beforeEach(() => {
    reducer = createReducer((_state, action) => action, {});
  });

  it("test default", () => {
    const [store] = reducer;
    const Comp = () => {
      const state = useStore(store, () => "foo");
      return <div>{state}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div>foo</div>");
  });

  it("test apply dispatch", async () => {
    const [store, dispatch] = reducer;
    const Comp = () => {
      const state = useStore(store, (emit) => {
        if (emit.current) {
          emit.current.state = "bar";
          emit.current.notify();
        }
      });
      return <div>{state}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div></div>");
    await act(() => dispatch(), 5);
    await waitFor(() => {
      expect(wrap.html()).to.equal("<div>bar</div>");
    });
  });

  it("test not apply dispatch", async () => {
    const heeding = sinon.spy((emit) => {
      const { action, notify } = emit.current || {};
      if (action && action.type === "on") {
        emit.current.state = "bar";
        notify();
      }
      return "foo";
    });

    const [store, dispatch] = reducer;
    const Comp = () => {
      const state = useStore(store, heeding);
      return <div>{state}</div>;
    };
    expect(heeding.callCount).to.equal(0);
    const wrap = render(<Comp />);
    expect(heeding.callCount >= 1).to.be.true;
    expect(wrap.html()).to.equal("<div>foo</div>");
    await act(() => dispatch("on"), 5);
    await waitFor(async () => {
      await act(() => {
        expect(heeding.callCount >= 2).to.be.true;
        expect(wrap.html()).to.equal("<div>bar</div>");
      });
    });
    await act(() => dispatch("off"), 5);
    await waitFor(async () => {
      await act(() => {
        expect(heeding.callCount >= 3).to.be.true;
        expect(wrap.html()).to.equal("<div>bar</div>");
      });
    });
  });
});

describe("useStore Test without heeding", () => {
  let reducer;
  beforeEach(() => {
    reducer = createReducer((_state, action) => action, { foo: "bar" });
  });

  it("test default", () => {
    const [store] = reducer;
    const Comp = () => {
      const state = useStore(store);
      return <div>{state.foo}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div>bar</div>");
  });

  it("test apply dispatch", async () => {
    const [store, dispatch] = reducer;
    const Comp = () => {
      const state = useStore(store);
      return <div>{state.bar}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div></div>");
    await act(() => dispatch({ bar: "aaa" }), 5);
    expect(wrap.html()).to.equal("<div>aaa</div>");
  });

  it("test ImmutableStore", async () => {
    const [store, dispatch] = ImmutableStore();
    const Comp = () => {
      const state = useStore(store);
      return <div>{state.get("foo")}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div></div>");
    await act(() => dispatch({ foo: "bar" }), 5);
    expect(wrap.html()).to.equal("<div>bar</div>");
  });
});
