import { expect } from "chai";
import { render, waitFor, act, getSinon } from "reshow-unit";
import { useEffect } from "react";

import usePartialRender from "../usePartialRender";

describe("Test usePartialRender", () => {
  it("smoke test", async () => {
    const spy = getSinon().spy();
    const Comp = () => {
      const [renderItems, partialRender, setRenderKeys] = usePartialRender([
        "foo",
        "bar",
      ]);

      useEffect(() => {
        partialRender({
          foo: <span>aaa</span>,
          bar: <span>bbb</span>,
        });
      }, []);
      spy();
      return <div>{renderItems}</div>;
    };
    const wrap = render(<Comp />);
    await act(() => {});
    await waitFor(() => {
      expect(wrap.html()).to.equal(
        "<div><span>aaa</span><span>bbb</span></div>"
      );
      // because STRICT_MODE will call two times, else actually 1.
      expect(spy.callCount).to.equal(2);
    });
  });

  it("test init children", async () => {
    const Comp = () => {
      const [renderItems, partialRender, setRenderKeys] = usePartialRender(
        ["foo", "bar"],
        { foo: <span />, bar: <i /> }
      );

      return <div>{renderItems}</div>;
    };
    const wrap = render(<Comp />);
    await act(() => {});
    await waitFor(() => {
      expect(wrap.html()).to.equal("<div><span></span><i></i></div>");
    });
  });

  it("test empty children", async () => {
    const Comp = () => {
      const [renderItems, partialRender, setRenderKeys] = usePartialRender();

      return <div>{renderItems}</div>;
    };
    const wrap = render(<Comp />);
    await act(() => {});
    await waitFor(() => {
      expect(wrap.html()).to.equal("<div></div>");
    });
  });
});
