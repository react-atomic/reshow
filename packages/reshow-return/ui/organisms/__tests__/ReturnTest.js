import React, { PureComponent } from "react";
import { ImmutableStore, mergeMap } from "reshow-flux";
import { expect } from "chai";
import { mount, cleanIt } from "reshow-unit";

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

  class FakeComponent extends PureComponent {
    state = {
      store: pageStore,
      initStates: ["data"],
      pathStates: { I13N: ["data", "I13N"] },
    };

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

  it("assign props", (done) => {
    const wrap = mount(<FakeComponent />);
    const uFake = wrap.instance();
    dispatch({ data: { foo: "bar", I13N: { aaa: "bbb" } } });
    setTimeout(() => {
      expect(uFake.el.props.data).to.deep.equal({
        foo: "bar",
        I13N: { aaa: "bbb" },
      });
      expect(uFake.el.props.I13N).to.deep.equal({ aaa: "bbb" });
      uFake.setNew("pathStates", { foo: ["data", "foo"] });
      setTimeout(() => {
        expect(uFake.el.props.foo).to.equal("bar");
        done();
      });
    });
  });

  it("test Immutable path state", (done) => {
    const vDom = <FakeComponent immutable />;
    const wrap = mount(vDom);
    const uFake = wrap.instance();
    dispatch({
      data: { foo: "bar", I13N: { a: "b" } },
    });
    setTimeout(() => {
      const firstData = uFake.el.props.data;
      const firstI13N = uFake.el.props.I13N;
      uFake.setNew("bar", "bbb");
      const secondData = uFake.el.props.data;
      const secondI13N = uFake.el.props.I13N;
      expect(firstData === secondData).to.be.true;
      expect(firstI13N === secondI13N).to.be.true;
      expect(firstData.toJS()).to.deep.equal({ foo: "bar", I13N: { a: "b" } });
      expect(firstI13N.toJS()).to.deep.equal({ a: "b" });
      done();
    });
  });

  it("test path state should clean", () => {
    const wrap = mount(<FakeComponent immutable />);
    const uFake = wrap.instance();
    dispatch({ data: "" });
    expect(uFake.el.props.I13N).to.undefined;
    const wrap1 = mount(<FakeComponent />);
    const uFake1 = wrap1.instance();
    expect(uFake1.el.props.I13N).to.undefined;
  });

  it("test child with function", (done) => {
    let i = 0;
    const vDom = (
      <Return store={pageStore} initStates={["data"]}>
        {(props) => {
          if (i && props.data) {
            expect(props).to.deep.equal({ data: "foo" });
            done();
          } else {
            i++;
          }
          return <div />;
        }}
      </Return>
    );
    const wrap = mount(vDom);
    dispatch({
      data: "foo",
    });
  });

  it("test backfill props", () => {
    dispatch({
      foo: "foo",
      bar: "bar",
    });
    const wrap = mount(
      <FakeComponent
        store={pageStore}
        initStates={["foo", "bar"]}
        backfillProps
        foo="foo1"
      />
    );
    const uFake = wrap.instance();
    const uFakeEl = uFake.el;
    expect(uFakeEl.props).to.deep.equal({ foo: "foo1", bar: "bar" });
  });

  it("test non backfill", () => {
    dispatch({
      foo: "foo",
      bar: "bar",
    });
    const wrap = mount(
      <FakeComponent store={pageStore} initStates={["foo", "bar"]} foo="foo1" />
    );
    const uFake = wrap.instance();
    const uFakeEl = uFake.el;
    expect(uFakeEl.props).to.deep.equal({ foo: "foo", bar: "bar" });
  });
});
