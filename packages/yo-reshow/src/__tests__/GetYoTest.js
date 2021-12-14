import { expect } from "chai";

import GetYo from "../index";

describe("Test GetYo", () => {
  it("basic test", ()=>{
    const o = GetYo();
    expect(o).is.not.null;
  });
});
