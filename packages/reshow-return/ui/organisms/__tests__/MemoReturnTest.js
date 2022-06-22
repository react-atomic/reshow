import { useState } from "react";
import { expect } from "chai";
import { act, render, getSinon as sinon } from "reshow-unit";
import MemoReturn from "../MemoReturn";
import build from "reshow-build";

describe("Test OnlyReturn", () => {
  it("basic test", () => {
    const Comp = (props) => <MemoReturn>{() => "div"}</MemoReturn>;
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div></div>");
  });

  it("render times test (function)", async () => {
    const spy1 = sinon().spy(() => {});
    const spy2 = sinon().spy(() => "div");
    let gSet;
    const Comp = (props) => {
      const [state, setState] = useState({});
      gSet = setState;
      spy1();
      return <MemoReturn props={state.props}>{() => spy2()}</MemoReturn>;
    };
    const wrap = render(<Comp />);
    let count1;
    let count2;
    count1 = spy1.callCount;
    count2 = spy2.callCount;
    expect(count1 === count2).to.be.true;
    await act(() => gSet({ foo: "bar" }));
    count1 = spy1.callCount;
    count2 = spy2.callCount;
    expect(count1 > count2, "1").to.be.true;
    await act(() => gSet({ props: {} }));
    expect(count2 < spy2.callCount, "2").to.be.true;
    count1 = spy1.callCount;
    count2 = spy2.callCount;
    await act(() => gSet((prev) => ({ ...prev, foo: "bar", props: {} })));
    expect(count2 < spy2.callCount, "3").to.be.true;
  });

  it("render time test (children)", async () => {
    const spy1 = sinon().spy(() => {});
    const spy2 = sinon().spy(() => "div");
    let gSet;
    const SubComp = (props) => (
      <MemoReturn props={props.props}>{props.children}</MemoReturn>
    );

    const Comp = (props) => {
      const [state, setState] = useState({});
      gSet = setState;
      spy1();
      return <SubComp props={state.props}>{spy2}</SubComp>;
    };
    const wrap = render(<Comp />);
    let count1;
    let count2;
    count1 = spy1.callCount;
    count2 = spy2.callCount;
    expect(count1 === count2).to.be.true;
    await act(() => gSet({ foo: "bar" }));
    count1 = spy1.callCount;
    count2 = spy2.callCount;
    expect(count1 > count2, "1").to.be.true;
    await act(() => gSet({ props: {} }));
    expect(count2 < spy2.callCount, "2").to.be.true;
    count1 = spy1.callCount;
    count2 = spy2.callCount;
    await act(() => gSet((prev) => ({ ...prev, foo: "bar", props: {} })));
    expect(count2 < spy2.callCount, "3").to.be.true;
  });
});
