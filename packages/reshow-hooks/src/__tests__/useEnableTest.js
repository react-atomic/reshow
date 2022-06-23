import { useEffect, useRef } from "react";
import { expect } from "chai";
import { render, cleanIt, waitFor, getSinon } from "reshow-unit";

import useEnable from "../useEnable";

describe("test useEnable", () => {
  afterEach(() => {
    cleanIt();
  });

  it("basic test", () => {
    let foo1;
    let foo2;
    const Comp = () => {
      const [bOn, setOn] = useEnable(1, 0);
      const initSwitch = useRef(bOn);
      foo1 = initSwitch.current;
      useEffect(() => {
        setOn();
      }, []);
      foo2 = bOn;
      return null;
    };
    render(<Comp />);
    expect(foo1).to.equal(0);
    expect(foo2).to.equal(1);
  });
});
