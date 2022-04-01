import { expect } from "chai";
import { render } from "../index";

describe("Test Render", () => {
  it("basic test", () => {
    const Foo = (props) => <div>bar</div>;
    const wrap = render(<Foo />);
    expect(wrap.html()).to.equal("<div>bar</div>");
  });
});
