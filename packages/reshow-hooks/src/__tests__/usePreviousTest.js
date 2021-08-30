import React, { Component } from "react";
import { expect } from "chai";
import { mount } from "reshow-unit";

import usePrevious from "../usePrevious";

describe("test usePrevious", () => {
  it("basic test", () => {
    let hackGlobal;
    const Foo = (props) => {
      const prev = usePrevious(props.v);
      hackGlobal = () => {
        return { v: props.v, prev };
      };
      return null;
    };

    class Comp extends Component {
      state = { v: null };

      setV(v) {
        this.setState({ v });
      }

      render() {
        return <Foo v={this.state.v} />;
      }
    }

    const wrap = mount(<Comp />);
    expect(hackGlobal()).to.deep.equal({ v: null, prev: undefined });
    wrap.instance().setV("bar");
    expect(hackGlobal()).to.deep.equal({ v: "bar", prev: null });
  });
});
