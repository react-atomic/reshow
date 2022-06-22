import React, { PureComponent } from "react";
import { expect } from "chai";
import { act, render, cleanIt } from "reshow-unit";

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

let uFake;
class FakeComponent extends PureComponent {
  constructor(props) {
    super(props);
    uFake = this;
  }
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

  it("test get local storage", async () => {
    const wrap = render(<FakeComponent storage={localStorageStore} />);
    const uString = "test123";
    await act(() => dispatch("local", { data: uString }), 5);
    expect(uFake.el.props.data).to.equal(uString);
  });

  it("test get session storage", async () => {
    const wrap = render(<FakeComponent storage={sessionStorageStore} />);
    const uString = "test456";
    await act(() => dispatch("session", { data: uString }), 5);
    expect(uFake.el.props.data).to.equal(uString);
  });
});
