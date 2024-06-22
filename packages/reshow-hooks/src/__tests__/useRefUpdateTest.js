// @ts-check

import { expect } from "chai";
import { render, act, waitFor } from "reshow-unit";

import * as React from "react";
const { useEffect, useState } = React;
import useRefUpdate from "../useRefUpdate";

describe("test useRefUpdate", () => {
  it("basic test", async () => {
    /**
     * @param {any} props
     */
    const Comp = (props) => {
      const last = useRefUpdate(props);
      return <div>{last.current.state}</div>;
    };
    const Parent = () => {
      const [state, setState] = useState("foo");
      useEffect(() => {
        setState("bar");
      });
      return <Comp state={state} />;
    };
    const wrap = render(<Parent />);
    await act();
    await waitFor(() => {
      expect(wrap.html()).to.equal("<div>bar</div>");
    });
  });
});
