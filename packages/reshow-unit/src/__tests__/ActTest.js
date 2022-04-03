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
    setTimeout(() => console.log(1), 1);
    setTimeout(() => console.log(2), 5);
    setTimeout(() => console.log(3), 9);
    await act(() => change("foo"), 10, true);
    expect(screen().getByRole("dom").outerHTML).to.equal(
      `<div role="dom">foo</div>`
    );
  });
});
