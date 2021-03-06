import React, { PureComponent } from "react";
import { Dispatcher, ReduceStore } from "reshow-flux";
import { expect } from "chai";
import { mount, cleanIt } from "reshow-unit";

import Return from "../Return";

class PageStore extends ReduceStore {
  reduce(state, action) {
    switch (action.type) {
      case "config/reset":
        return state.clear().merge(action.params);
      default:
        if (Object.keys(action)) {
          return state.merge(action);
        } else {
          return state;
        }
    }
  }
}

const dispatcher = new Dispatcher();
const pageStore = new PageStore(dispatcher);
const dispatch = dispatcher.dispatch;

describe("Test Return", () => {
  class TestEl extends PureComponent {
    render() {
      return <div />;
    }
  }

  class FakeComponent extends PureComponent {
    state = {
      stores: [pageStore],
      initStates: ["data"],
      pathStates: { I13N: ["data", "I13N"] },
    };

    setNew(k, v) {
      this.setState({ [k]: v });
    }

    render() {
      const { stores, initStates, pathStates, ...otherState } = this.state;
      return (
        <Return
          stores={stores}
          initStates={initStates}
          pathStates={pathStates}
          {...this.props}
        >
          <TestEl ref={(el) => (this.el = el)} {...otherState} />
        </Return>
      );
    }
  }

  let reset;
  let origConsoleError;

  beforeEach(() => {
    dispatch("config/reset");
  });

  afterEach(() => {
    cleanIt();
  });

  it("assign props", (done) => {
    const wrap = mount(<FakeComponent withPropsChange />);
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
      }, 100);
    }, 100);
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
    }, 100);
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
      <Return stores={[pageStore]} initStates={["data"]}>
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

  it("test store not defined", () => {
    origConsoleError = console.error;
    console.error = () => {};
    expect(() => {
      mount(<Return />);
    }).to.throw();
    console.error = origConsoleError;
  });
});
