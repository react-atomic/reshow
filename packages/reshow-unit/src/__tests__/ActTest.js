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
    setTimeout(() => console.log(1), 10);
    setTimeout(() => console.log(2), 20);
    setTimeout(() => console.log(3), 30);
    await act(() => change("foo"), 30, true);
    expect(screen().getByRole("dom").outerHTML).to.equal(
      `<div role="dom">foo</div>`
    );
  });
});
