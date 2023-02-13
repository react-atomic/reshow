import { useRef, PureComponent, forwardRef, useImperativeHandle } from "react";
import { expect } from "chai";
import { render } from "reshow-unit";

import mergeRef from "../mergeRef";

describe("Test merge ref", () => {
  it("test hook", () => {
    const CompRoot = forwardRef((props, ref) => {
      const lastEl = useRef();
      const expose = {
        el: () => lastEl.current,
      };
      useImperativeHandle(ref, () => expose, []);
      return <Comp refCb={lastEl} />;
    });
    let childRef;
    const Comp = (props) => {
      const lastEl = useRef();
      childRef = lastEl;
      return <div ref={(el) => mergeRef(el, [lastEl, props.refCb])} />;
    };
    const wrap = render(<CompRoot />, { instance: true });
    expect(wrap.instance().el().nodeName).to.equal("DIV");
    expect(childRef.current.nodeName).to.equal("DIV");
  });

  it("test callback", () => {
    class CompRoot extends PureComponent {
      handleRefCb = (el) => (this.el = el);

      render() {
        return <Comp refCb={this.handleRefCb} />;
      }
    }
    let childRef;
    const Comp = (props) => {
      return (
        <span
          ref={(el) => mergeRef(el, [(el) => (childRef = el), props.refCb])}
        />
      );
    };
    const wrap = render(<CompRoot />, { instance: true });
    expect(wrap.instance().el.nodeName).to.equal("SPAN");
    expect(childRef.nodeName).to.equal("SPAN");
  });
});
