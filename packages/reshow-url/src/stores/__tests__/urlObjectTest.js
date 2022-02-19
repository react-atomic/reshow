import { expect } from "chai";

import { URL } from "../urlStore";

describe("Test url object", () => {
  it("basic test", () => {
    const oUrl = new URL();
    expect(!!oUrl).to.be.true;
  });

  it("test cook loc key", () => {
    const oUrl = new URL();
    const ukey = ":foo";
    const actual = oUrl.getLocKey(ukey);
    expect(actual).to.equal("foo");
  });

  it("test get pathname", () => {
    const oUrl = new URL({ pathname: "/foo/bar" });
    const actual = oUrl.get(":pathname");
    expect(actual).to.deep.equal(["", "foo", "bar"]);
  });
});
