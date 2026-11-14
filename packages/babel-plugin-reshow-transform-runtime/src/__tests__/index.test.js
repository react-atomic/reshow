import { describe, expect, test } from "bun:test";
import path from "path";
import { transformSync } from "@babel/core";
import presetEnv from "@babel/preset-env";

import plugin from "../index";

const dirname = path.resolve(import.meta.dir, "../..");

const transform = (code, options = {}) =>
  transformSync(code, {
    babelrc: false,
    configFile: false,
    plugins: [[plugin, options]],
    presets: [[presetEnv, { targets: { ie: "11" }, modules: false }]],
  }).code;

describe("babel-plugin-reshow-transform-runtime", () => {
  test("imports helpers from reshow-runtime", () => {
    const code = transform("class A {}");
    expect(code).toContain("reshow-runtime/helpers/classCallCheck");
    expect(code).not.toContain("@babel/runtime");
  });

  test("skips helpers missing from the installed runtime", () => {
    const file = {
      path: { node: { sourceType: "module" } },
      availableHelper: () => true,
      set(key, value) {
        this[key] = value;
      },
    };

    plugin({ assertVersion() {}, caller: () => false }, {}, dirname).pre(file);

    expect(file.helperGenerator("maybeArrayLike")).toBeUndefined();
  });

  test("rejects unsupported corejs versions", () => {
    expect(() => transform("var a = 1;", { corejs: 3 })).toThrow(
      /The 'corejs' option must be undefined, false, 2 or '2'/,
    );
  });
});
