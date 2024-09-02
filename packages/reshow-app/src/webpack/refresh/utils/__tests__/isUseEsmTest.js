import { expect } from "chai";
import { resolve } from "path";

import isUseEsm, { pkgType } from "../isUseEsm";
import { getDirName } from "../../../util/getDirName";

const dir = resolve(
  getDirName(),
  "../../../../../src/webpack/refresh/utils/__tests__/"
);

describe("Test isUseEsm", () => {
  beforeEach(() => (pkgType.current = null));
  it("test file extensions (mjs)", () => {
    const acture = isUseEsm("xxx.mjs");
    expect(acture).to.be.true;
  });
  it("test file extensions (cjs)", () => {
    const acture = isUseEsm("xxx.cjs");
    expect(acture).to.be.false;
  });
  it("test package.json not exists", () => {
    const acture = isUseEsm("xxx.js");
    expect(pkgType.current).to.be.null;
    expect(acture).to.be.false;
  });
  it("test package.json not contain type", () => {
    const acture = isUseEsm("xxx.js", `${dir}/resources`);
    expect(pkgType.current).to.be.false;
    expect(acture).to.be.false;
  });
  it("test package.json has type module", () => {
    const acture = isUseEsm("xxx.js", `${dir}/resources.type`);
    expect(pkgType.current != null).to.be.true;
    expect(acture).to.be.true;
  });
});
