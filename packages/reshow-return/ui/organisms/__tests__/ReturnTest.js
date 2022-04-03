import React, { PureComponent } from "react";
import { ImmutableStore, mergeMap } from "reshow-flux";
import { expect } from "chai";
import { act, render, getRoleHtml, cleanIt } from "reshow-unit";

import Return from "../Return";

const [pageStore, dispatch] = ImmutableStore((state, action) => {
  switch (action.type) {
    case "config/reset":
      return mergeMap(state.clear(), action.params);
    default:
      if (Object.keys(action)) {
        return mergeMap(state, action);
      } else {
        return state;
      }
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
      dispatch({
        data: { foo: "bar", I13N: { a: "b" } },
      });
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
    await act(() => {
      render(vDom);
      dispatch({ data: "foo" });
    });
    expect(getRoleHtml('dom')).to.equal(`<div role="dom">foo</div>`);
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
});
