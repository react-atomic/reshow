import React, { PureComponent, isValidElement, Children } from "react";

import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import build from "../index";

describe("Test wrap", () => {
  it("test build with wrap", () => {
    const FakeDom = () => {
      return build("test", { wrap: <div /> })();
    };
    const wrap = shallow(<FakeDom />);
    expect(wrap.html()).to.equal("<div>test</div>");
  });

  it("test wrap after function call", () => {
    const FakeDom = () => {
      return build(() => "after-func-call", {
        wrap: "div",
        doCallFunction: true,
      })({ "data-foo": "bar" });
    };
    const wrap = shallow(<FakeDom />);
    expect(wrap.html()).to.equal('<div data-foo="bar">after-func-call</div>');
  });

  it("test wrap after function call and unset props", () => {
    const FakeDom = () => {
      return build(
        (props) => {
          delete props["data-foo"];
          return "after-func-call";
        },
        {
          wrap: "div",
          doCallFunction: true,
        }
      )({ "data-foo": "foo", "data-bar": "bar" });
    };
    const wrap = shallow(<FakeDom />);
    expect(wrap.html()).to.equal('<div data-bar="bar">after-func-call</div>');
  });
});
