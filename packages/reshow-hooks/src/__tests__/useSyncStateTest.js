import { useRef, useEffect } from "react";
import { expect } from "chai";
import { render, waitFor } from "reshow-unit";

import useSyncState from "../useSyncState";

describe("test useSyncState", () => {
  it("basic test", () => {
    const Comp = () => {
      const [state, setState] = useSyncState("foo");
      return <div>{state}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal(`<div>foo</div>`);
  });

  it("should sync", () => {
    let gFoo1;
    let gFoo2;
    let gFoo3;
    const Comp = () => {
      const [state, setState, lastState] = useSyncState("foo");
      const lastSync = useRef(state);
      gFoo1 = lastSync;
      useEffect(() => {
        setState("bar");
        gFoo2 = state;
        gFoo3 = lastState();
      }, []);
      return <div>{state}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal(`<div>bar</div>`);
    expect(gFoo1.current).to.equal('foo');
    expect(gFoo2).to.equal('foo');
    expect(gFoo3).to.equal('bar');
  });

  it("test set callback", ()=>{
    let gFoo1;
    const Comp = () => {
      const [state, setState, lastState] = useSyncState("foo");
      useEffect(() => {
        setState((prev)=>{
          if (null == gFoo1) {
            gFoo1 = prev;
          }
          return "bar";
        });
      }, []);
      return <div>{state}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal(`<div>bar</div>`);
    expect(gFoo1).to.equal('foo');
  });
});
