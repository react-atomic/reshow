import { describe, it, beforeEach, afterEach } from "bun:test";

import { useState } from "react";
import { expect } from "chai";
import { render, screen, act, jsdom, cleanIt } from "../index";

describe("Test Act", () => {
  beforeEach(() => { jsdom(); });
  afterEach(() => { cleanIt(); });
  it("basic test", async () => {
    let change;
    const Foo = (props) => {
      const [state, setState] = useState();
      change = setState;
      return <div role="dom">{state}</div>;
    };
    render(<Foo />);
    expect(screen().getByRole("dom").outerHTML).to.equal(
      `<div role="dom"></div>`,
    );
    setTimeout(() => console.log(1), 1);
    setTimeout(() => console.log(2), 5);
    setTimeout(() => console.log(3), 9);
    await act(() => change("foo"), 10, true);
    expect(screen().getByRole("dom").outerHTML).to.equal(
      `<div role="dom">foo</div>`,
    );
  });
  it("support async callback with options object", async () => {
    let change;
    const Foo = (props) => {
      const [state, setState] = useState();
      change = setState;
      return <div role="dom">{state}</div>;
    };
    render(<Foo />);
    await act(async () => {
      change("foo");
    }, { ms: 0 });
    expect(screen().getByRole("dom").outerHTML).to.equal(
      `<div role="dom">foo</div>`,
    );
  });

  it("async cb without ms waits for cb to finish (a)", async () => {
    let change;
    const Foo = (props) => {
      const [state, setState] = useState();
      change = setState;
      return <div role="dom">{state}</div>;
    };
    render(<Foo />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
      change("foo");
    });
    expect(screen().getByRole("dom").outerHTML).to.equal(
      `<div role="dom">foo</div>`,
    );
  });

  it("async cb with explicit ms waits promise then ms (b)", async () => {
    let change;
    const Foo = (props) => {
      const [state, setState] = useState();
      change = setState;
      return <div role="dom">{state}</div>;
    };
    render(<Foo />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
      change("foo");
    }, 10);
    expect(screen().getByRole("dom").outerHTML).to.equal(
      `<div role="dom">foo</div>`,
    );
  });

  it("sync cb with ms (c)", async () => {
    let change;
    const Foo = (props) => {
      const [state, setState] = useState();
      change = setState;
      return <div role="dom">{state}</div>;
    };
    render(<Foo />);
    setTimeout(() => change("foo"), 5);
    await act(() => {}, 10);
    expect(screen().getByRole("dom").outerHTML).to.equal(
      `<div role="dom">foo</div>`,
    );
  });

  it("act() with no args (d)", async () => {
    await act();
  });

  it("act(cb, { ms, debug }) object form (e)", async () => {
    let change;
    const Foo = (props) => {
      const [state, setState] = useState();
      change = setState;
      return <div role="dom">{state}</div>;
    };
    render(<Foo />);
    await act(() => change("foo"), { ms: 0, debug: false });
    expect(screen().getByRole("dom").outerHTML).to.equal(
      `<div role="dom">foo</div>`,
    );
  });
});
