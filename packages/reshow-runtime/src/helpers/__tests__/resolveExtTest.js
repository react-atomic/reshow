import { expect } from "chai";

import resolveExt from "../resolveExt";

describe("Test resolveExt", () => {
  it("test append", () => {
    const path = "./xxx";
    const extMap = { "": ".js" };
    const actual = resolveExt(path, extMap);
    expect(actual).to.equal("./xxx.js");
  });

  it("test node should not append", () => {
    const path = "xxx";
    const extMap = { "": ".js" };
    const actual = resolveExt(path, extMap);
    expect(actual).to.equal("xxx");
  });

  it("test always append", () => {
    const path = "./xxx.example";
    const extMap = { "": ".js", ".example": ".example" };
    const actual = resolveExt(path, extMap);
    expect(actual).to.equal("./xxx.example.js");
  });

  it("test replace", () => {
    const path = "./xxx.example";
    const extMap = { ".example": ".mjs" };
    const actual = resolveExt(path, extMap);
    expect(actual).to.equal("./xxx.mjs");
  });

  it("test with loader", () => {
    const path = "foo-loader!../index";
    const extMap = { "": ".mjs" };
    const actual = resolveExt(path, extMap);
    expect(actual).to.equal("foo-loader!../index.mjs");
  });
});
