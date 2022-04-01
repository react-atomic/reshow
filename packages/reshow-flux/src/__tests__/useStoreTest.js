import { expect } from "chai";
import { act, render } from "reshow-unit";
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
      const state = useStore(store, () => () => "foo");
      return <div>{state}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div>foo</div>");
  });

  it("test apply dispatch", async () => {
    const [store, dispatch] = reducer;
    const Comp = (props) => {
      const state = useStore(store, (setState) => () => {
        setState && setState("bar");
      });
      return <div>{state}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div></div>");
    await act(() => dispatch());
    expect(wrap.html()).to.equal("<div>bar</div>");
  });

  it("test not apply dispatch", async () => {
    let spy;
    const heeding = (setState) => {
      spy = sinon.spy((state, action) => {
        if (action && action.type === "on") {
          setState("bar");
        }
        return "foo";
      });
      return spy;
    };

    const [store, dispatch] = reducer;
    const Comp = (props) => {
      const state = useStore(store, heeding);
      return <div>{state}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div>foo</div>");
    expect(spy.callCount).to.equal(0);
    await act(() => dispatch("on"));
    expect(spy.callCount).to.equal(1);
    expect(wrap.html()).to.equal("<div>bar</div>");
    await act(() => dispatch("off"));
    expect(spy.callCount).to.equal(2);
    expect(wrap.html()).to.equal("<div>bar</div>");
  });
});
