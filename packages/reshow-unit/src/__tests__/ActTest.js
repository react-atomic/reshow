import { useState } from "react";
import { expect } from "chai";
import { render, screen, act, waitFor } from "../index";

describe("Test Act", () => {
  it("basic test", async () => {
    let change;
    const Foo = (props) => {
      const [state, setState] = useState();
      change = setState;
      return <div role="dom">{state}</div>;
    };
    render(<Foo />);
    expect(screen().getByRole("dom").outerHTML).to.equal(
      `<div role="dom"></div>`
    );
    await act(() => change("foo"));
    expect(screen().getByRole("dom").outerHTML).to.equal(
      `<div role="dom">foo</div>`
    );
  });
});
