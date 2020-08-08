"use strict";

import React from "react";
import { connectFunctional, Dispatcher, ReduceStore } from "../index";
import { expect } from "chai";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Test Connect Functional", () => {
  class FakeStore extends ReduceStore {
    getInitialState() {
      return [];
    }

    reduce(state, action) {
      return action;
    }
  }
  let dispatcher = new Dispatcher();
  let store = new FakeStore(dispatcher);

  it("could register with store", (done) => {
    const FakeComponent = ({ aaa }) => <div>{aaa}</div>;
    const fakeGetStores = () => [store];
    const fakeCalculateState = (prevState) => {
      const state = store.getState();
      return { aaa: state.aaa };
    };
    let FakeConnected = connectFunctional(
      FakeComponent,
      fakeGetStores,
      fakeCalculateState
    );
    let vDom = <FakeConnected />;
    const html = shallow(vDom);
    dispatcher.dispatch({ aaa: "Hello dispatcher!" });
    setTimeout(() => {
      html.update();
      expect(html.html()).to.equal("<div>Hello dispatcher!</div>");
      done();
    }, 50);
  });
});
