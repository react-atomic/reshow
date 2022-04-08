import { expect } from "chai";
import { act, render, waitFor } from "reshow-unit";
import { createReducer } from "reshow-flux-base";
import sinon from "sinon";

import useStore from "../useStore";

describe("useStore Test", () => {
  let reducer;
  beforeEach(() => {
    reducer = createReducer((state, action) => action, {});
  });

  it("test default", () => {
    const [store, dispatch] = reducer;
    const Comp = (props) => {
      const state = useStore(store, () => "foo");
      return <div>{state}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div>foo</div>");
  });

  it("test apply dispatch", async () => {
    const [store, dispatch] = reducer;
    const Comp = (props) => {
      const state = useStore(store, (emit = {}) => {
        emit && emit.current && (emit.current.state = "bar");
        emit?.current?.notify();
      });
      return <div>{state}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div></div>");
    await act(() => dispatch(), 5);
    expect(wrap.html()).to.equal("<div>bar</div>");
  });

  it("test not apply dispatch", async () => {
    const heeding = sinon.spy((emit = {}) => {
      const { action, notify } = emit.current || {};
      if (action && action.type === "on") {
        emit.current.state = "bar";
        notify();
      }
      return "foo";
    });

    const [store, dispatch] = reducer;
    const Comp = (props) => {
      const state = useStore(store, heeding);
      return <div>{state}</div>;
    };
    expect(heeding.callCount).to.equal(0);
    const wrap = render(<Comp />);
    expect(heeding.callCount).to.equal(1);
    expect(wrap.html()).to.equal("<div>foo</div>");
    await act(() => dispatch("on"));
    await waitFor(() => {
      expect(heeding.callCount).to.equal(2);
      expect(wrap.html()).to.equal("<div>bar</div>");
    });
    await act(() => dispatch("off"), 5);
    await waitFor(() => {
      expect(heeding.callCount).to.equal(3);
      expect(wrap.html()).to.equal("<div>bar</div>");
    });
  });
});

describe("useStore Test without heeding", () => {
  let reducer;
  beforeEach(() => {
    reducer = createReducer((state, action) => action, { foo: "bar" });
  });
  it("test default", () => {
    const [store, dispatch] = reducer;
    const Comp = (props) => {
      const state = useStore(store);
      return <div>{state.foo}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div>bar</div>");
  });
  it("test apply dispatch", async () => {
    const [store, dispatch] = reducer;
    const Comp = (props) => {
      const state = useStore(store);
      return <div>{state.bar}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div></div>");
    await act(() => dispatch({ bar: "aaa" }), 5);
    expect(wrap.html()).to.equal("<div>aaa</div>");
  });
});
