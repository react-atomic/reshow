import { PureComponent } from "react";

import { expect } from "chai";
import { render } from "reshow-unit";

import build from "../index";

describe("Test build render", () => {

  it("test build string", () => {
    const vdom = build("Foo Bar")();
    const actual = render(vdom).html();
    expect(actual).to.equal("<span>Foo Bar</span>");
  });

  it("test build string with child", () => {
    const vdom = build("Foo Bar")({}, <div />);
    const actual = render(vdom).html();
    expect(actual).to.equal("<span>Foo Bar</span>");
  });

  it("test build string with params has child", () => {
    const vdom = build("Foo Bar")({ children: <div /> });
    const actual = render(vdom).html();
    expect(actual).to.equal("<span>Foo Bar</span>");
  });

  it("test build native html", () => {
    const vdom = build("a")();
    const actual = render(vdom).html();
    expect(actual).to.equal("<a></a>");
  });

  it("test function return another component", () => {
    class FakeComponent extends PureComponent {
      render() {
        return <div>{this.props.foo}</div>;
      }
    }
    const func = (props) => {
      return <FakeComponent {...props} />;
    };
    const vDom = build(func)({ foo: "bar3" });
    const html = render(vDom).html();
    expect(html).to.equal("<div>bar3</div>");
  });

  it("test with anonymous func and child", () => {
    const child = [<div id="1" key="0" />, <div id="2" key="1" />];
    const buildDom = build(({ children }) => <div id="root">{children}</div>)(
      {},
      child
    );
    const html = render(<div>{buildDom}</div>).html();
    const stateFunc = ({ children }) => <div id="root">{children}</div>;
    const stateFuncBuildDom = build(stateFunc)({}, child);
    const stateFuncHtml = render(<div>{stateFuncBuildDom}</div>).html();
    const expected =
      '<div><div id="root"><div id="1"></div><div id="2"></div></div></div>';
    expect(html).to.equal(expected);
    expect(stateFuncHtml).to.equal(expected);
  });

  it("test with component", () => {
    const FakeComponent = (props) => <div>{props.foo}</div>;
    const vDom = build(FakeComponent)({ foo: "bar" });
    const html = render(vDom).html();
    expect(html).to.equal("<div>bar</div>");
  });

  it("test with instance", () => {
    const FakeComponent = (props) => <div>{props.foo}</div>;
    const vDom = <FakeComponent />;
    const html = render(build(vDom)({ foo: "bar1" })).html();
    expect(html).to.equal("<div>bar1</div>");
  });

  it("test with class component", () => {
    class FakeComponent extends PureComponent {
      render() {
        return <div>{this.props.foo}</div>;
      }
    }
    const vDom = build(FakeComponent)({ foo: "bar2" });
    const html = render(vDom).html();
    expect(html).to.equal("<div>bar2</div>");
  });

  it("test with clone and child", () => {
    class FakeComponent extends PureComponent {
      render() {
        const { comp, ...others } = this.props;
        return build(comp)(others, "bar");
      }
    }
    const html = render(
      <FakeComponent id="foo" comp={<div>foo</div>} />
    ).html();
    expect(html).to.equal('<div id="foo">bar</div>');
  });

  it("test with class and child", () => {
    class FakeComponent extends PureComponent {
      render() {
        return <div {...this.props} />;
      }
    }
    const vDom = build(FakeComponent)({ id: "foo" }, "hello");
    const html = render(vDom).html();
    expect(html).to.equal('<div id="foo">hello</div>');
  });

});
