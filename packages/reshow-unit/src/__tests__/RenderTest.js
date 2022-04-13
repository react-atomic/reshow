import { PureComponent } from "react";
import { expect } from "chai";
import { render, unmount, getRoleHtml } from "../index";

describe("Test Render", () => {
  it("basic test", () => {
    const Foo = (props) => <div>bar</div>;
    const wrap = render(<Foo />);
    expect(wrap.html()).to.equal("<div>bar</div>");
  });

  it("test unmount", () => {
    const Foo = (props) => <div>bar</div>;
    const wrap = render(<Foo />);
    expect(document.body.innerHTML).to.have.string("bar");
    wrap.unmount();
    expect(document.body.innerHTML).not.have.string("bar");
  });

  it("Test get role html", () => {
    const Foo = (props) => <div role="dom">bar</div>;
    render(<Foo />);
    expect(getRoleHtml("dom")).to.equal(`<div role="dom">bar</div>`);
  });

  it("Test get instance", () => {
    class Foo extends PureComponent {
      bar() {
        return "foo";
      }
      render() {
        return <div />;
      }
    }
    const wrap = render(<Foo />, { instance: true });
    expect(wrap.instance().bar()).to.equal("foo");
  });

  it("Test get instance with callback", () => {
    class Foo extends PureComponent {
      bar() {
        return "foo";
      }
      render() {
        return <div />;
      }
    }
    let myEl;
    const wrap = render(<Foo />, { instance: (el) => (myEl = el) });
    expect(myEl.bar()).to.equal("foo");
  });
});
