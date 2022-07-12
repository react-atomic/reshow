import { useRef, useState } from "react";
import { expect } from "chai";
import { render, act, waitFor } from "reshow-unit";

import useSyncChange from "../useSyncChange";

describe("test useSyncChange", () => {
  it("basic test", async ()=>{
    const FOO = props => {
      const lastFoo = useRef();
      useSyncChange(props.foo, v => lastFoo.current = v); 
      return <div>{lastFoo.current}</div>;
    };
    let gSet;
    const Comp = props => {
      const [state, setState] = useState();
      gSet = setState;
      return <FOO foo={state} />;
    };
    const wrap = render(<Comp />);
    await waitFor(()=>{
      expect(wrap.html()).to.equal("<div></div>");
    }); 
    await act(()=>gSet("bar"));

    await waitFor(()=>{
      expect(wrap.html()).to.equal("<div>bar</div>");
    }); 
  });
});
