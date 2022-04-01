import { expect } from "chai";
import { render, screen, cleanIt, jsdom } from "../index";

describe("Test cleanIt", () => {
  beforeEach(() => {
    jsdom();
  });
  afterEach(() => {
    cleanIt();
  });

  it("basic test", () => {
    const DIV = () => <div role="dom">foo</div>;
    render(<DIV />);
    expect(screen().getByRole("dom").innerHTML).to.equal("foo");
  });

  it("test attach", () => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    const SPAN = () => <span />;
    render(<SPAN />, { container: el });
    expect(document.body.innerHTML).to.equal("<div><span></span></div>");
    document.foo = "bar";
    cleanIt({ withoutJsdom: true });
    expect(document.body.innerHTML).to.equal("");
    expect(document.foo).to.equal("bar");
    cleanIt();
    expect(document.foo).to.be.undefined;
  });
});
