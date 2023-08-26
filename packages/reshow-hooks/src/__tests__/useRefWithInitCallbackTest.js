// @ts-check

import * as React from "react";
const { useEffect } = React;
import useRefWithInitCallback from "../useRefWithInitCallback";
import { expect } from "chai";
import { render, act, waitFor, getSinon as sinon } from "reshow-unit";

describe("test useRefInitCallback", () => {
  it("basic test", async () => {
    const myspy = sinon().spy(() => "");
    const effectSpy = sinon().spy(() => "");
    const Comp = () => {
      const last = useRefWithInitCallback(myspy);
      useEffect(() => {
        if (!last.current) {
          effectSpy();
        }
        last.current = true;
      });
      return <div>{last.current}</div>;
    };
    render(<Comp />);
    await act();
    await waitFor(() => {
      expect(myspy.callCount).to.be.equal(2);
      expect(effectSpy.callCount).to.be.equal(1);
    });
  });
});
