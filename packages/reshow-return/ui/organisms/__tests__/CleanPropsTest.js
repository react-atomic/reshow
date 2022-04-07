import { expect } from "chai";
import { PureComponent } from "react";

import Return from "../Return";
import { createReducer } from "reshow-flux-base";
import { render, waitFor } from "reshow-unit";

describe("Test Return clean props", () => {
  it("basic test", () => {
    let uFake;
    const reducer = createReducer((state, action) => action);
    const [store, dispatch] = reducer;
    const Dom = (props) => {
      return (
        <Return data-foo="bar" store={store} immutable>
          <SubDom ref={(el) => (uFake = el)} />
        </Return>
      );
    };
    class SubDom extends PureComponent {
      render() {
        return null;
      }
    }
    render(<Dom />);
    waitFor(() => {
      expect(uFake.props).to.equal({ "data-foo": "bar" });
    });
  });
});
