import { expect } from "chai";

import { MyURL } from "../urlStore";

describe("Test url object", () => {
  it("basic test", () => {
    const oUrl = new MyURL();
    expect(!!oUrl).to.be.true;
  });

  it("test cook loc key", () => {
    const oUrl = new MyURL();
    const ukey = ":foo";
    const actual = oUrl.getLocKey(ukey);
    expect(actual).to.equal("foo");
  });

  it("test get pathname", () => {
    const oUrl = new MyURL({ pathname: "/foo/bar" });
    const actual = oUrl.get(":pathname");
    expect(actual).to.deep.equal(["", "foo", "bar"]);
  });
});
