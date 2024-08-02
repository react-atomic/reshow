// @ts-check

import { expect } from "chai";
import * as React from "react";
const { useState, useEffect } = React;

import { render, act, sleep } from "reshow-unit";
import useTimer from "../useTimer";

describe("test useTimer", () => {
  it("basic timer", async () => {
    const Comp = () => {
      const [run] = useTimer();
      const [foo, setFoo] = useState(0);
      useEffect(() => {
        run(() => setFoo(1));
      });
      return <div>{foo}</div>;
    };
    const wrap = render(<Comp />);
    await act(() => {
      expect(wrap.html()).to.equal("<div>0</div>");
    });
    await act();
    await sleep(() => {
      act(() => {
        expect(wrap.html()).to.equal("<div>1</div>");
      });
    }, 100);
  });
});
