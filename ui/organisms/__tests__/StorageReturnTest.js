import React, { PureComponent } from "react";
import { expect } from "chai";
import { mount, cleanIt } from "reshow-unit";

import { globalStore } from "../../../src/stores/globalStore";

import {
  Return,
  localStorageStore,
  sessionStorageStore,
  dispatch,
} from "../../../src/index";

class TestEl extends PureComponent {
  show = 0;
  render() {
    this.show++;
    return <div />;
  }
}

class FakeComponent extends PureComponent {
  render() {
    const { storage } = this.props;
    return (
      <Return store={storage}>
        <TestEl ref={(el) => (this.el = el)} />
      </Return>
    );
  }
}

describe("Test Storage Return", () => {
  beforeEach(() => {
    globalStore.path = null;
  });

  afterEach(() => {
    cleanIt();
  });

  it("test get local storage", (done) => {
    const vDom = <FakeComponent storage={localStorageStore} />;
    const uFake = mount(vDom).instance();
    const uString = "test123";
    dispatch("local", { data: uString });
    setTimeout(() => {
      expect(uFake.el.props.data).to.equal(uString);
      done();
    }, 100);
  });

  it("test get session storage", (done) => {
    const vDom = <FakeComponent storage={sessionStorageStore} />;
    const uFake = mount(vDom).instance();
    const uString = "test456";
    dispatch("session", { data: uString });
    setTimeout(() => {
      expect(uFake.el.props.data).to.equal(uString);
      done();
    }, 100);
  });
});
