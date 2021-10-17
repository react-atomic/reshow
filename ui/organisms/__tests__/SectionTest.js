import React, { PureComponent } from "react";
import { Section, dispatch } from "../../../src/index";
import { globalStore } from "../../../src/stores/globalStore";

import { expect } from "chai";
import { mount, cleanIt } from "reshow-unit";

class TestEl extends PureComponent {
  render() {
    return <div />;
  }
}

class FakeComponent extends PureComponent {
  static defaultProps = {
    name: "test",
  };

  render() {
    const { immutable, name } = this.props;
    return (
      <Section name={name} immutable={immutable}>
        <TestEl ref={(el) => (this.el = el)} />
      </Section>
    );
  }
}

describe("Test Section", () => {
  beforeEach(() => {
    globalStore.path = null;
  });

  afterEach(()=>{
    cleanIt();
    dispatch("config/reset");
  });

  it("Section is existed", (done) => {
    const vDom = <FakeComponent />;
    const uFake = mount(vDom).instance();
    dispatch({
      section: {
        test: {
          shouldRender: true,
          aaa: { bbb: "ccc" },
        },
      },
      I18N: { ddd: "fff" },
    });
    setTimeout(() => {
      expect(uFake.el.props.aaa).to.deep.equal({ bbb: "ccc" });
      expect(uFake.el.props.I18N).to.deep.equal({ ddd: "fff" });
      done();
    }, 100);
  });

  it("Section is not existed", (done) => {
    const vDom = <FakeComponent name="xxx" />;
    const uFake = mount(vDom).instance();
    dispatch({
      section: null,
    });
    setTimeout(() => {
      expect("undefined" === typeof uFake.el).to.be.true;
      done();
    });
  });

  it("Section is existed with immutable", (done) => {
    const vDom = <FakeComponent immutable />;
    const uFake = mount(vDom).instance();
    dispatch({
      section: {
        test: {
          shouldRender: true,
          aaa: { bbb: "ccc" },
        },
      },
      I18N: { ddd: "fff" },
    });
    setTimeout(() => {
      expect(uFake.el.props.aaa.toJS()).to.deep.equal({ bbb: "ccc" });
      expect(uFake.el.props.I18N.toJS()).to.deep.equal({ ddd: "fff" });
      done();
    }, 100);
  });

  it("Section is not existed with immutable", (done) => {
    const vDom = <FakeComponent name="xxx" immutable />;
    const uFake = mount(vDom).instance();
    dispatch({
      section: null,
    });
    setTimeout(() => {
      expect("undefined" === typeof uFake.el).to.be.true;
      done();
    });
  });

  it("pass name to child", (done) => {
    class PassName extends PureComponent {
      render() {
        const { immutable, name } = this.props;
        return (
          <Section name="test">
            <div ref={(el) => (this.el = el)} />
          </Section>
        );
      }
    }
    const vDom = <PassName />;
    const wrap = mount(vDom).instance();
    dispatch({
      section: {
        test: {
          shouldRender: true,
          aaa: { bbb: "ccc" },
        },
      },
    });
    setTimeout(() => {
      expect(wrap.el.getAttribute("name")).to.equal("test");
      done();
    }, 10);
  });

  it("not pass name if child already have name", (done) => {
    class NotPassName extends PureComponent {
      render() {
        const { immutable, name } = this.props;
        return (
          <Section name="test">
            <div name="test2" ref={(el) => (this.el = el)} />
          </Section>
        );
      }
    }
    const vDom = <NotPassName />;
    const wrap = mount(vDom).instance();
    dispatch({
      section: {
        test: {
          shouldRender: true,
          aaa: { bbb: "ccc" },
        },
      },
    });
    setTimeout(() => {
      expect(wrap.el.getAttribute("name")).to.equal("test2");
      done();
    }, 10);
  });

  it("not pass name if one of child already have name", (done) => {
    class NotPassNameMultiChild extends PureComponent {
      render() {
        const { immutable, name } = this.props;
        return (
          <Section name="test">
            <div
              ref={(el) => {
                this.el1 = el;
              }}
            />
            <div name="test2" ref={(el) => (this.el2 = el)} />
          </Section>
        );
      }
    }
    const vDom = <NotPassNameMultiChild />;
    const wrap = mount(vDom);
    const uObj = wrap.instance();
    dispatch({
      section: {
        test: {
          shouldRender: true,
          aaa: { bbb: "ccc" },
        },
      },
    });
    setTimeout(() => {
      wrap.update();
      expect(uObj.el1.getAttribute("name")).to.be.null;
      expect(uObj.el2.getAttribute("name")).to.equal("test2");
      done();
    }, 100);
  });
});
