// @ts-check
import * as React from "react";
const { Children } = React;

import { expect } from "chai";
import { render } from "reshow-unit";

import build from "../index";

describe("Test build array", () => {
  it("test build aray without props", () => {
    const arr = [<div />, <div />];
    const wrap = render(build(arr)());
    expect(wrap.html()).to.equal("<div></div><div></div>");
  });

  it("test with multi children", () => {
    const FakeDom = ({ children }) => {
      return <div>{build(children)({ title: "foo" })}</div>;
    };
    const vDom = (
      <FakeDom>
        {null}
        <div>1</div>
        <div>2</div>
      </FakeDom>
    );
    const wrap = render(vDom);
    expect(wrap.html()).to.equal(
      '<div><div title="foo">1</div><div title="foo">2</div></div>'
    );
  });

  it("test with multi function", () => {
    const FakeDom = ({ children }) => {
      expect(Children.count(children)).to.equal(2);
      return (
        <div>
          {build(children)({
            foo: <div>{"foo"}</div>,
            bar: <div>{"bar"}</div>,
          })}
        </div>
      );
    };
    const vDom = (
      <FakeDom>
        {({ foo }) => foo}
        <div />
        <div />
        {({ bar }) => bar}
      </FakeDom>
    );
    const wrap = render(vDom);
    expect(wrap.html()).to.equal(
      '<div><div>foo</div><div foo="[object Object]" bar="[object Object]"></div><div foo="[object Object]" bar="[object Object]"></div><div>bar</div></div>'
    );
  });

  it("test with multi Component instance", () => {
    const FakeDom = ({ children }) => {
      expect(Children.count(children)).to.equal(2);
      return (
        <div>
          {build(children)({
            foo: <div>{"foo"}</div>,
            bar: <div>{"bar"}</div>,
          })}
        </div>
      );
    };
    const A = ({ foo }) => foo;
    const B = ({ bar }) => bar;
    const vDom = (
      <FakeDom>
        {A}
        <div />
        <div />
        {B}
      </FakeDom>
    );
    const wrap = render(vDom);
    expect(wrap.html()).to.equal(
      '<div><div>foo</div><div foo="[object Object]" bar="[object Object]"></div><div foo="[object Object]" bar="[object Object]"></div><div>bar</div></div>'
    );
  });

  it("test with sub array", () => {
    /**
     * @param {{children?:any}} props
     */
    const FakeDom = ({ children }) => {
      const arr = [<i />, ...(Children.map(children, (c) => c) || [])];
      return <div>{build(arr)({ "data-foo": "bar" })}</div>;
    };

    const vDom = (
      <FakeDom>
        <span />
        <span />
      </FakeDom>
    );
    const wrap = render(vDom);
    expect(wrap.html()).to.equal(
      '<div><i data-foo="bar"></i><span data-foo="bar"></span><span data-foo="bar"></span></div>'
    );
    const vDom2 = (
      <FakeDom>
        <span />
      </FakeDom>
    );
    const wrap2 = render(vDom2);
    expect(wrap2.html()).to.equal(
      '<div><i data-foo="bar"></i><span data-foo="bar"></span></div>'
    );
    const vDom3 = <FakeDom />;
    const wrap3 = render(vDom3);
    expect(wrap3.html()).to.equal('<div><i data-foo="bar"></i></div>');
  });
});
