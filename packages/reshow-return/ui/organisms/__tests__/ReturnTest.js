import { PureComponent, useState } from "react";
import { ImmutableStore, mergeMap, fromJS } from "reshow-flux";
import { expect } from "chai";
import {
  act,
  waitFor,
  render,
  getRoleHtml,
  cleanIt,
  getSinon as sinon,
} from "reshow-unit";

import Return from "../Return";
import MemoReturn from "../MemoReturn";

const [pageStore, dispatch] = ImmutableStore((state, action) => {
  switch (action.type) {
    case "config/reset":
      return fromJS(action.params) || state.clear();
    default:
      return mergeMap(state, action);
  }
});

describe("Test Return", () => {
  class TestEl extends PureComponent {
    render() {
      return <div />;
    }
  }
  let uFake;
  class FakeComponent extends PureComponent {
    state = {
      store: pageStore,
      initStates: ["data"],
      pathStates: { I13N: ["data", "I13N"] },
    };

    constructor(props) {
      super(props);
      uFake = this;
    }

    setNew(k, v) {
      this.setState({ [k]: v });
    }

    render() {
      const { store, initStates, pathStates, ...otherState } = this.state;
      return (
        <Return
          renewProps
          store={store}
          initStates={initStates}
          pathStates={pathStates}
          {...this.props}
        >
          <TestEl ref={(el) => (this.el = el)} {...otherState} />
        </Return>
      );
    }
  }

  afterEach(() => {
    cleanIt();
    dispatch("config/reset");
  });

  it("assign props", async () => {
    const wrap = render(<FakeComponent />);
    await act(
      () => dispatch({ data: { foo: "bar", I13N: { aaa: "bbb" } } }),
      5
    );
    expect(uFake.el.props.data).to.deep.equal({
      foo: "bar",
      I13N: { aaa: "bbb" },
    });
    expect(uFake.el.props.I13N).to.deep.equal({ aaa: "bbb" });
    await act(() => uFake.setNew("pathStates", { foo: ["data", "foo"] }));
    expect(uFake.el.props.foo).to.equal("bar");
  });

  it("test Immutable path state", async () => {
    const wrap = render(<FakeComponent immutable />);
    await act(() => {
      dispatch(
        fromJS({
          data: { foo: "bar", I13N: { a: "b" } },
        })
      );
    }, 5);
    const firstData = uFake.el.props.data;
    const firstI13N = uFake.el.props.I13N;
    await act(() => {
      uFake.setNew("bar", "bbb");
    }, 5);
    const secondData = uFake.el.props.data;
    const secondI13N = uFake.el.props.I13N;
    expect(firstData === secondData).to.be.true;
    expect(firstI13N === secondI13N).to.be.true;
    expect(firstData.toJS()).to.deep.equal({ foo: "bar", I13N: { a: "b" } });
    expect(firstI13N.toJS()).to.deep.equal({ a: "b" });
  });

  it("test path state should clean", async () => {
    render(<FakeComponent immutable />);
    expect(uFake.el.props.data).to.undefined;
    await act(() => dispatch({ data: "" }), 3);
    expect(uFake.el.props.I13N).to.undefined;
    expect(uFake.el.props.data).to.equal("");
  });

  it("test child with function", async () => {
    const vDom = (
      <Return store={pageStore} initStates={["data"]}>
        {(props) => {
          return <div role="dom">{props.data}</div>;
        }}
      </Return>
    );
    render(vDom);
    await act(() => {
      dispatch({ data: "foo" });
    }, 10);
    expect(getRoleHtml("dom")).to.equal(`<div role="dom">foo</div>`);
  });

  it("test backfill props", () => {
    dispatch({
      foo: "foo",
      bar: "bar",
    });
    const wrap = render(
      <FakeComponent
        store={pageStore}
        initStates={["foo", "bar"]}
        backfillProps
        foo="foo1"
      />
    );
    const uFakeEl = uFake.el;
    expect(uFakeEl.props).to.deep.equal({ foo: "foo1", bar: "bar" });
  });

  it("test non backfill", () => {
    dispatch({
      foo: "foo",
      bar: "bar",
    });
    const wrap = render(
      <FakeComponent store={pageStore} initStates={["foo", "bar"]} foo="foo1" />
    );
    const uFakeEl = uFake.el;
    expect(uFakeEl.props).to.deep.equal({ foo: "foo", bar: "bar" });
  });

  it("test Return render times", async () => {
    const spy = sinon().spy((props) => (
      <div data-state={props.foo} data-props={props.bar} />
    ));
    let gSet;
    const Comp = (props) => {
      const [state, setState] = useState({});
      gSet = setState;
      return (
        <MemoReturn props={state.bar}>
          <Return initStates={["foo"]} store={pageStore}>
            {spy}
          </Return>
        </MemoReturn>
      );
    };
    const wrap = render(<Comp />);
    let count;
    count = spy.callCount;
    expect(count > 1, 1).to.be.true;
    await act(() => dispatch({ foo: "bar" }));
    await waitFor(()=>expect(count < spy.callCount, 2).to.be.true);
    count = spy.callCount;
    await act(() => dispatch({ bar: "bar" }));
    expect(count === spy.callCount, 3).to.be.true;
    count = spy.callCount;
    await act(() => gSet((prev) => ({ ...prev, bar: { bar: "b" } })));
    expect(count < spy.callCount, 4).to.be.true;
    count = spy.callCount;
    await act(() => gSet((prev) => ({ ...prev, foo: { bar: "b" } })));
    expect(count === spy.callCount, 5).to.be.true;
    expect(wrap.html()).to.equal(`<div data-state="bar" data-props="b"></div>`);
  });
});
