// @ts-check
import * as React from "react";
const { PureComponent } = React;

import { expect } from "chai";
import { render } from "reshow-unit";

import build from "../index";

describe("Test build render", () => {
  it("test build native html", () => {
    const vdom = /**@type React.ReactElement*/ (build("a")());
    const actual = render(vdom).html();
    expect(actual).to.equal("<a></a>");
  });

  it("test function return another component", () => {
    class FakeComponent extends PureComponent {
      render() {
        return <div>{this.props.foo}</div>;
      }
    }
    const func = (/**@type any*/ props) => {
      return <FakeComponent {...props} />;
    };
    const vDom = /**@type React.ReactElement*/ (build(func)({ foo: "bar3" }));
    const html = render(vDom).html();
    expect(html).to.equal("<div>bar3</div>");
  });

  it("test with anonymous func and child", () => {
    const child = [<div id="1" key="0" />, <div id="2" key="1" />];
    const buildDom = build((/** @type any*/ { children }) => (
      <div id="root">{children}</div>
    ))({}, child);
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
    const FakeComponent = (/** @type any*/ props) => <div>{props.foo}</div>;
    const vDom = /**@type React.ReactElement*/ (
      build(FakeComponent)({ foo: "bar" })
    );
    const html = render(vDom).html();
    expect(html).to.equal("<div>bar</div>");
  });

  it("test with instance", () => {
    const FakeComponent = (/** @type any*/ props) => <div>{props.foo}</div>;
    const vDom = /**@type React.ReactElement*/ (
      build(<FakeComponent />)({ foo: "bar1" })
    );
    const html = render(vDom).html();
    expect(html).to.equal("<div>bar1</div>");
  });

  it("test with class component", () => {
    class FakeComponent extends PureComponent {
      render() {
        return <div>{this.props.foo}</div>;
      }
    }
    const vDom = /**@type React.ReactElement*/ (
      build(FakeComponent)({ foo: "bar2" })
    );
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
      <FakeComponent id="foo" comp={<div>foo</div>} />,
    ).html();
    expect(html).to.equal('<div id="foo">bar</div>');
  });

  it("test with class and child", () => {
    class FakeComponent extends PureComponent {
      render() {
        return <div {...this.props} />;
      }
    }
    const vDom = /**@type React.ReactElement*/ (
      build(FakeComponent)({ id: "foo" }, "hello")
    );
    const html = render(vDom).html();
    expect(html).to.equal('<div id="foo">hello</div>');
  });
});
