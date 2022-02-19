import React, { PureComponent, isValidElement, Children } from "react";

import { expect } from "chai";
import { shallow } from "reshow-unit";

import build from "../index";

describe("Test build", () => {
  it("test build string", () => {
    const vdom = build("Foo Bar")();
    const actual = shallow(vdom).html();
    expect(actual).to.equal("<span>Foo Bar</span>");
  });

  it("test build string with child", () => {
    const vdom = build("Foo Bar")({}, <div />);
    const actual = shallow(vdom).html();
    expect(actual).to.equal("<span>Foo Bar</span>");
  });

  it("test build string with params has child", () => {
    const vdom = build("Foo Bar")({children: <div />});
    const actual = shallow(vdom).html();
    expect(actual).to.equal("<span>Foo Bar</span>");
  });

  it("test build native html", () => {
    const vdom = build("a")();
    const actual = shallow(vdom).html();
    expect(actual).to.equal("<a></a>");
  });

  it("test function with error", () => {
    const run = () => {
      build((props) => {
        expect(props.foo).to.equal("bar111");
      })({ foo: "bar" });
    };
    expect(run).to.throw();
  });

  it("test function with return", () => {
    const a = build((props) => props.foo)({ foo: "barbar" });
    expect(a).to.equal("barbar");
  });

  it("test with stateless function return", () => {
    const func = (props) => <div {...props} />;
    const a = build(func)({ foo: "barbar" });
    // will return react instance
    expect(a.props.foo).to.equal("barbar");
    expect(isValidElement(a)).to.be.true;
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
    const html = shallow(vDom).html();
    expect(html).to.equal("<div>bar3</div>");
  });

  it("test with func and child", () => {
    const result = build((props) => props)({ foo: "bar" }, "hello child");
    expect(result.children).to.equal("hello child");
    expect(result.foo).to.equal("bar");
  });

  it("test with anonymous func and child", () => {
    const child = [<div id="1" key="0" />, <div id="2" key="1" />];
    const buildDom = build(({ children }) => <div id="root">{children}</div>)(
      {},
      child
    );
    const html = shallow(<div>{buildDom}</div>).html();
    const stateFunc = ({ children }) => <div id="root">{children}</div>;
    const stateFuncBuildDom = build(stateFunc)({}, child);
    const stateFuncHtml = shallow(<div>{stateFuncBuildDom}</div>).html();
    const expected =
      '<div><div id="root"><div id="1"></div><div id="2"></div></div></div>';
    expect(html).to.equal(expected);
    expect(stateFuncHtml).to.equal(expected);
  });

  it("test with component", () => {
    const FakeComponent = (props) => <div>{props.foo}</div>;
    const vDom = build(FakeComponent)({ foo: "bar" });
    const html = shallow(vDom).html();
    expect(html).to.equal("<div>bar</div>");
  });

  it("test with instance", () => {
    const FakeComponent = (props) => <div>{props.foo}</div>;
    const vDom = <FakeComponent />;
    const html = shallow(build(vDom)({ foo: "bar1" })).html();
    expect(html).to.equal("<div>bar1</div>");
  });

  it("test with class component", () => {
    class FakeComponent extends PureComponent {
      render() {
        return <div>{this.props.foo}</div>;
      }
    }
    const vDom = build(FakeComponent)({ foo: "bar2" });
    const html = shallow(vDom).html();
    expect(html).to.equal("<div>bar2</div>");
  });

  it("test with clone and child", () => {
    class FakeComponent extends PureComponent {
      render() {
        const { comp, ...others } = this.props;
        return build(comp)(others, "bar");
      }
    }
    const html = shallow(
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
    const html = shallow(vDom).html();
    expect(html).to.equal('<div id="foo">hello</div>');
  });

  it("test with empty", () => {
    const result = build()();
    expect(result).to.be.null;
  });
});

describe("Test build with key", () => {
  it("with one child", () => {
    const comp = <div />;
    const buildComp = build(comp)({ key: "foo" });
    expect(buildComp.key).to.equal("foo");
  });

  it("with multi child", () => {
    const comp = <div />;
    const buildComp = build([comp, comp])({ key: "foo" });
    expect(buildComp[0].key !== buildComp[1].key).be.true;
  });
});
