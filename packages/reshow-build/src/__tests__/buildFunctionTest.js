import { expect } from "chai";
import build from "../index";

describe("Test build function", () => {
  it("test function", (done) => {
    build((props) => {
      expect(props.foo).to.equal("bar");
      done();
    })({ foo: "bar" });
  });

  it("test with force call", (done) => {
    const func = (props) => {
      expect(props.foo).to.equal("bar");
      done();
    };
    build(func, { doCallFunction: true })({ foo: "bar" });
  });
});
