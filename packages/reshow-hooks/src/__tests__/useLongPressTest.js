// @ts-check
import * as React from "react";
import { expect } from "chai";
import useLongPress from "../useLongPress";
import { getSinon, render, waitFor, act } from "reshow-unit";

describe("test useLongPress", () => {
  it("test run", async () => {
    const sinon = getSinon();
    const clock = sinon.useFakeTimers();
    const thisCallback = sinon.spy(() => {});
    const Dom = () => {
      const handles = useLongPress(thisCallback);
      handles.onMouseDown();
      return <div />;
    };
    render(<Dom />);
    clock.tick(501);
    await waitFor(() => {
      expect(thisCallback.called).to.be.true;
    });
  });

  it("test cancel", async () => {
    const sinon = getSinon();
    const thisCallback = sinon.spy(() => {});
    const Dom = () => {
      const handlers = useLongPress(thisCallback);
      handlers.onMouseDown();
      handlers.onMouseUp();
      return <div />;
    };
    render(<Dom />);
    await act(() => {
      expect(thisCallback.called).to.be.false;
    });
  });
});
