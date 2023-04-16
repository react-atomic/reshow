/**
 * https://github.com/webpack/webpack/blob/main/test/Errors.test.js
 */

import { expect } from "chai";
import { isWebpackCompileError } from "../index";
describe("Test isWebpackCompileError", () => {
  it("test with Module", () => {
    const actual = isWebpackCompileError({
      message:
        "Module build failed (from ./module-level-throw-error-loader.js)",
    });
    expect(actual).to.be.true;
  });
  it("test Module not found", () => {
    const actual = isWebpackCompileError({
      message:
        "Module not found: Error: Can't resolve './doesnt-exist-loader' in '<cwd>/test/fixtures/errors'",
    });
    expect(actual).to.be.true;
  });
  it("test Module build failed", () => {
    const actual = isWebpackCompileError({
      message:
        "Module build failed: Error: Final loader (./return-undefined-loader.js) didn't return a Buffer or String",
    });
    expect(actual).to.be.true;
  });
});
