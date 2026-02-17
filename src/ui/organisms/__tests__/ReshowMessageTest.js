import { expect } from "chai";
import { act, render, getRoleHtml, cleanIt, waitFor } from "reshow-unit";

import {  PopupPool } from "organism-react-popup";

import ReshowMessage from "../ReshowMessage";
import { dispatch } from "../../../index";

describe("Test ReshowMessage", () => {
  afterEach(() => {
    cleanIt();
  });

  it("simple test", async () => {
    const wrap = render(<ReshowMessage />);
    await act(() => {}, 100);
    expect(wrap.html()).to.have.string("div");
  });

  it("test dialog", async () => {
    const VDom = () => (
      <div role="udom">
        <ReshowMessage />
        <PopupPool />
      </div>
    );
    let wrap;
    await act(() => {
      wrap = render(<VDom />);
      dispatch("dialog/start", { dialog: "how are u" });
    }, 5);
    await waitFor(() => {
      expect(getRoleHtml("udom")).to.have.string("dialog");
    });
    wrap.unmount();
  });
});
