// @ts-check
/**
 * @typedef {import("mocha")}
 */

import { expect } from "chai";
import { SimpleMap } from "../SimpleMap";

describe("Test SimpleMap", () => {
  it("test init object", () => {
    const oMap = new SimpleMap({ foo: "bar" });
    expect(oMap.toJS()).to.deep.equal({ foo: "bar" });
  });

  it("test get single value", () => {
    const oMap = new SimpleMap({ foo: "bar" });
    expect(oMap.get("foo")).to.equal("bar");
  });

  it("test get map", () => {
    const oMap = new SimpleMap({ foo: { aaa: "bbb" } });
    expect(oMap.get("foo").toJS()).to.deep.equal({ aaa: "bbb" });
  });

  it("test set", () => {
    const oMap = new SimpleMap({ foo: { aaa: "bbb" } });
    expect(oMap.set("foo", { ccc: "ddd" }).toJS()).to.deep.equal({
      foo: { ccc: "ddd" },
    });
  });

  it("test set with map", () => {
    const oMap = new SimpleMap({ foo: { aaa: "bbb" } });
    expect(oMap.set("foo", new SimpleMap({ eee: "fff" })).toJS()).to.deep.equal(
      { foo: { eee: "fff" } },
    );
  });

  it("test delete", () => {
    const oMap = new SimpleMap({ a: "b", c: "d", e: "f" });
    expect(oMap.delete("c").toJS()).to.deep.equal({ a: "b", e: "f" });
  });

  it("test merge", () => {
    const oMap = new SimpleMap({ foo: "bar" });
    expect(oMap.merge({ bar: "foo" }).toJS()).to.deep.equal({
      foo: "bar",
      bar: "foo",
    });
  });

  it("test forEach", () => {
    const data = { a: "aa", b: "bb" };
    const oMap = new SimpleMap(data);
    oMap.forEach((v, k) => {
      expect(v).to.equal(data[k]);
    });
  });
});
