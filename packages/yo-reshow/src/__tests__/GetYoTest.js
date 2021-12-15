import { expect } from "chai";

import getYo from "../index";

describe("Test GetYo", () => {
  it("basic test", ()=>{
    const o = getYo();
    expect(o).is.not.null;
  });
});
