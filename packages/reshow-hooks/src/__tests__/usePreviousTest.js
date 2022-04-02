import { Component } from "react";
import { expect } from "chai";
import { render, act } from "reshow-unit";

import usePrevious from "../usePrevious";

describe("test usePrevious", () => {
  it("basic test", async () => {
    let hackGlobal;
    const Foo = (props) => {
      const prev = usePrevious(props.v);
      hackGlobal = () => {
        return { v: props.v, prev };
      };
      return null;
    };

    let ufakeSet;
    class Comp extends Component {
      state = { v: null };
      constructor(props) {
        super(props);
        ufakeSet = (v) => {
          this.setState({ v });
        };
      }

      render() {
        return <Foo v={this.state.v} />;
      }
    }

    render(<Comp />);
    expect(hackGlobal()).to.deep.equal({ v: null, prev: undefined });
    await act(() => ufakeSet("bar"));
    expect(hackGlobal()).to.deep.equal({ v: "bar", prev: null });
  });
});
