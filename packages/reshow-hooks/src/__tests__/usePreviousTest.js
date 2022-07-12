import { Component } from "react";
import { expect } from "chai";
import { render, act } from "reshow-unit";

import usePrevious from "../usePrevious";

describe("test usePrevious", () => {
  it("basic test", async () => {
    let hackGlobal;
    let i = 0;
    const expectedPrev = [
      undefined,
      undefined,
      null,
      "bar"
    ];

    const Foo = (props) => {
      const prev = usePrevious(props.v);
      expect(prev).to.equal(expectedPrev[i++]);
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
    expect(hackGlobal(), 1).to.deep.equal({ v: null, prev: undefined });
    await act(() => {
      ufakeSet("bar");
    });
    expect(hackGlobal(), 2).to.deep.equal({ v: "bar", prev: "bar" });
  });
});
