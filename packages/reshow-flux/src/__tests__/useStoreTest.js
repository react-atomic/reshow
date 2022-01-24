import React from "react";

import { expect } from "chai";
import { mount } from "reshow-unit";
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
    const wrap = mount(<Comp />);
    expect(wrap.html()).to.equal("<div>foo</div>");
  });

  it("test apply dispatch", (done) => {
    const [store, dispatch] = reducer;
    const Comp = (props) => {
      const state = useStore(store, (setState) => () => {
        setState && setState("bar");
      });
      return <div>{state}</div>;
    };
    const wrap = mount(<Comp />);
    dispatch();
    setTimeout(() => {
      expect(wrap.html()).to.equal("<div>bar</div>");
      done();
    });
  });

  it("test not apply dispatch", (done) => {
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
    const wrap = mount(<Comp />);
    expect(wrap.html()).to.equal("<div>foo</div>");
    expect(spy.callCount).to.equal(0);
    dispatch("on");
    setTimeout(() => {
      expect(spy.callCount).to.equal(1);
      expect(wrap.html()).to.equal("<div>bar</div>");
      dispatch("off");
      setTimeout(() => {
        expect(spy.callCount).to.equal(2);
        expect(wrap.html()).to.equal("<div>bar</div>");
        done();
      });
    });
  });
});
