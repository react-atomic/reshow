import React from "react";
import Reshow from "../Reshow";
import { globalStore } from "../../../stores/globalStore";
import dispatch from "../../../dispatch";

import { expect } from "chai";
import { waitFor, render, cleanIt } from "reshow-unit";

describe("Test Reshow Component", () => {
  afterEach(() => {
    dispatch("config/reset");
    globalStore.path = null;
    cleanIt();
  });

  it("Reshow simple test", async () => {
    const wrapper = render(
      <Reshow themes={{ hello: <div>Hello World!</div> }} themePath="hello" />,
    );
    await waitFor(() =>
      expect(wrapper.html()).to.equal("<div>Hello World!</div>"),
    );
  });
});
