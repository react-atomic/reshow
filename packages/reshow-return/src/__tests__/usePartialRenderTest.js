// @ts-check

import { expect } from "chai";
import { render, waitFor, act, getSinon } from "reshow-unit";
import * as React from "react";
const { useEffect, useState } = React;
import { Map } from "reshow-flux";

import usePartialRender from "../usePartialRender";

describe("Test usePartialRender", () => {
  it("smoke test", async () => {
    const spy = getSinon().spy();
    const Comp = () => {
      const [renderItems, partialRender, _setRenderKeys] = usePartialRender([
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
        "<div><span>aaa</span><span>bbb</span></div>",
      );
      // because STRICT_MODE will call two times, else actually 1.
      expect(spy.callCount).to.equal(2);
    });
  });

  it("test init children", async () => {
    const Comp = () => {
      const list = {
        foo: <span />,
        bar: <i />,
      };
      const [renderItems] = usePartialRender(Object.keys(list), list);

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
      const [renderItems] = usePartialRender();

      return <div>{renderItems}</div>;
    };
    const wrap = render(<Comp />);
    await act(() => {});
    await waitFor(() => {
      expect(wrap.html()).to.equal("<div></div>");
    });
  });

  it("test reset", async () => {
    let gSetCall;
    let gCount = 0;
    const Comp = () => {
      const list = {
        foo: <span>{gCount}</span>,
        bar: <i />,
      };
      const [call, setCall] = useState(0);
      const [renderItems, partialRender] = usePartialRender(
        Object.keys(list),
        list,
      );
      gSetCall = setCall;
      useEffect(() => {
        partialRender(list);
      }, [call]);

      return <div data-call={call}>{renderItems}</div>;
    };
    const wrap = render(<Comp />);
    await act(() => {});
    await waitFor(() => {
      expect(wrap.html()).to.equal(
        `<div data-call="0"><span>0</span><i></i></div>`,
      );
    });
    await act(() => {
      gCount++;
      gSetCall((/** @type number*/ c) => ++c);
    });
    await act();
    await waitFor(() => {
      expect(wrap.html()).to.equal(
        `<div data-call="1"><span>1</span><i></i></div>`,
      );
    });
  });

  it("test use keySeq", async () => {
    const list = Map({
      foo: <span />,
      bar: <i />,
    });
    const Comp = () => {
      const [renderItems] = usePartialRender(list.keySeq(), list);
      return <>{renderItems}</>;
    };
    const wrap = render(<Comp />);
    await act();
    await waitFor(() => {
      expect(wrap.html()).to.equal(`<span></span><i></i>`);
    });
  });
});
