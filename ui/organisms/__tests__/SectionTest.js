import React, { PureComponent } from "react";
import { expect } from "chai";
import { fromJS } from "reshow-flux";
import { act, render, waitFor, cleanIt } from "reshow-unit";

import { Section, dispatch } from "../../../src/index";
import { globalStore } from "../../../src/stores/globalStore";

class TestEl extends PureComponent {
  render() {
    return <div />;
  }
}

let uFake;
class FakeComponent extends PureComponent {
  static defaultProps = {
    name: "test",
  };
  constructor(props) {
    super(props);
    uFake = this;
  }

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

  afterEach(() => {
    dispatch("config/reset");
    cleanIt();
  });

  it("Section is existed", async () => {
    const wrap = render(<FakeComponent />);
    await act(
      () =>
        dispatch({
          section: {
            test: {
              shouldRender: true,
              aaa: { bbb: "ccc" },
            },
          },
          I18N: { ddd: "fff" },
        }),
      3
    );
    waitFor(() => {
      expect(uFake.el.props.aaa).to.deep.equal({ bbb: "ccc" });
      expect(uFake.el.props.I18N).to.deep.equal({ ddd: "fff" });
    });
  });

  it("Section is not existed", async () => {
    const wrap = render(<FakeComponent name="xxx" />);
    await act(() => dispatch({ section: null }), 3);
    expect("undefined" === typeof uFake.el).to.be.true;
  });

  it("Section is existed with immutable", async () => {
    const wrap = render(<FakeComponent immutable />);
    await act(
      () =>
        dispatch(
          fromJS({
            section: {
              test: {
                shouldRender: true,
                aaa: { bbb: "ccc" },
              },
            },
            I18N: { ddd: "fff" },
          })
        ),
      3
    );
    await waitFor(() => {
      expect(uFake.el.props.aaa.toJS()).to.deep.equal({ bbb: "ccc" });
      expect(uFake.el.props.I18N.toJS()).to.deep.equal({ ddd: "fff" });
    });
  });

  it("Section is not existed with immutable", async () => {
    const wrap = render(<FakeComponent name="xxx" immutable />);
    await act(() => dispatch({ section: null }));
    await waitFor(() => {
      expect("undefined" === typeof uFake.el).to.be.true;
    });
  });

  it("pass name to child", async () => {
    let uFake;
    class PassName extends PureComponent {
      constructor(props) {
        super(props);
        uFake = this;
      }
      render() {
        const { immutable, name } = this.props;
        return (
          <Section name="test">
            <div ref={(el) => (this.el = el)} />
          </Section>
        );
      }
    }
    const wrap = render(<PassName />);
    await act(
      () =>
        dispatch({
          section: {
            test: {
              shouldRender: true,
              aaa: { bbb: "ccc" },
            },
          },
        }),
      5
    );
    await waitFor(() => {
      expect(uFake.el.getAttribute("name")).to.equal("test");
    });
  });

  it("not pass name if child already have name", async () => {
    let uFake;
    class NotPassName extends PureComponent {
      constructor(props) {
        super(props);
        uFake = this;
      }
      render() {
        const { immutable, name } = this.props;
        return (
          <Section name="test">
            <div name="test2" ref={(el) => (this.el = el)} />
          </Section>
        );
      }
    }
    const wrap = render(<NotPassName />);
    await act(
      () =>
        dispatch({
          section: {
            test: {
              shouldRender: true,
              aaa: { bbb: "ccc" },
            },
          },
        }),
      5
    );
    waitFor(() => expect(uFake.el.getAttribute("name")).to.equal("test2"));
  });

  it("not pass name if one of child already have name", async () => {
    let uFake;
    class NotPassNameMultiChild extends PureComponent {
      constructor(props) {
        super(props);
        uFake = this;
      }
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
    const wrap = render(<NotPassNameMultiChild />);
    await act(
      () =>
        dispatch({
          section: {
            test: {
              shouldRender: true,
              aaa: { bbb: "ccc" },
            },
          },
        }),
      3
    );
    waitFor(() => {
      expect(uFake.el1.getAttribute("name")).to.be.null;
      expect(uFake.el2.getAttribute("name")).to.equal("test2");
    });
  });
});
