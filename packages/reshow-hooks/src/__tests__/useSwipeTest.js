// @ts-check
import * as React from "react";
import { expect } from "chai";

import { useSwipe } from "../useSwipe";
import { render, waitFor, act } from "reshow-unit";

/**
 * @typedef {import("../useSwipe").DirectionType} DirectionType
 */

describe("test useSwipe", () => {
  it("test swipe up", async () => {
    let actual;
    /**
     * @param {DirectionType} direction
     */
    const callback = (direction) => {
      actual = direction;
    };
    const Dom = () => {
      const handles = useSwipe({ callback });
      handles.onMouseDown(/**@type any*/ ({ clientX: 0, clientY: 101 }));
      handles.onMouseMove(/**@type any*/ ({ clientX: 0, clientY: 0 }));
      handles.onMouseUp(/**@type any*/ ({}));
      return <div {...handles} />;
    };
    render(<Dom />);
    await act(() => {
      expect(actual).to.equal("up");
    });
  });

  it("test swipe right", async () => {
    let actual;
    /**
     * @param {DirectionType} direction
     */
    const callback = (direction) => {
      actual = direction;
    };
    const Dom = () => {
      const handles = useSwipe({ callback });
      handles.onMouseDown(/**@type any*/ ({ clientX: 0, clientY: 0 }));
      handles.onMouseMove(/**@type any*/ ({ clientX: 101, clientY: 0 }));
      handles.onMouseUp(/**@type any*/ ({}));
      return <div {...handles} />;
    };
    render(<Dom />);
    await act(() => {
      expect(actual).to.equal("right");
    });
  });

  it("test swipe down", async () => {
    let actual;
    /**
     * @param {DirectionType} direction
     */
    const callback = (direction) => {
      actual = direction;
    };
    const Dom = () => {
      const handles = useSwipe({ callback });
      handles.onMouseDown(/**@type any*/ ({ clientX: 0, clientY: 0 }));
      handles.onMouseMove(/**@type any*/ ({ clientX: 0, clientY: 101 }));
      handles.onMouseUp(/**@type any*/ ({}));
      return <div {...handles} />;
    };
    render(<Dom />);
    await act(() => {
      expect(actual).to.equal("down");
    });
  });

  it("test swipe left", async () => {
    let actual;
    /**
     * @param {DirectionType} direction
     */
    const callback = (direction) => {
      actual = direction;
    };
    const Dom = () => {
      const handles = useSwipe({ callback });
      handles.onMouseDown(/**@type any*/ ({ clientX: 101, clientY: 0 }));
      handles.onMouseMove(/**@type any*/ ({ clientX: 0, clientY: 0 }));
      handles.onMouseUp(/**@type any*/ ({}));
      return <div {...handles} />;
    };
    render(<Dom />);
    await act(() => {
      expect(actual).to.equal("left");
    });
  });
});
