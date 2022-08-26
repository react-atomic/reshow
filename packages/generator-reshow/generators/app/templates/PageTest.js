import { expect } from "chai";
import { render } from "reshow-unit";

import Page1 from "../Page1";

describe("Page Test", () => {
  it("basic test", () => {
    const wrap = render(<Page1 />);
    const html = wrap.html();
    expect(html).to.have.string("This is page");
  });
});
