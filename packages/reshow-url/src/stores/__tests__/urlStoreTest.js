import { cleanIt, jsdom } from "reshow-unit";
import { expect } from "chai";
import getUrlReducer from "../urlStore";

describe("Test set New Url", () => {
  const { store: urlStore, dispatch: urlDispatch } = getUrlReducer();
  beforeEach(() => {
    jsdom(null, { url: "http://localhost" });
    urlStore.reset();
  });

  afterEach(() => {
    cleanIt();
  });

  it("test dispatch url from action", () => {
    expect(document.URL).to.equal("http://localhost/");
    urlDispatch({
      type: "url",
      url: "http://localhost/a",
    });
    expect(document.URL).to.equal("http://localhost/a");
  });

  it("test dispatch url from params", () => {
    expect(document.URL).to.equal("http://localhost/");
    urlDispatch("url", { url: "http://localhost/b" });
    expect(document.URL).to.equal("http://localhost/b");
  });

  it("test clean group url", () => {
    urlDispatch({
      type: "query",
      group: "foo",
      params: { foo: "foo", bar: "bar" },
    });
    expect(document.URL).to.equal("http://localhost/?foo=foo&bar=bar");
    urlDispatch({
      type: "query",
      group: "foo",
      params: { a: "a" },
    });
    expect(document.URL).to.equal("http://localhost/?foo=foo&bar=bar&a=a");
    urlDispatch({
      type: "query",
      params: { b: "b" },
    });
    expect(document.URL).to.equal("http://localhost/?&b=b");
  });

  it("test clean group url from empty", () => {
    urlDispatch({
      type: "query",
      params: { foo: "foo", bar: "bar" },
    });
    expect(document.URL).to.equal("http://localhost/?foo=foo&bar=bar");
    urlDispatch({
      type: "query",
      group: "foo",
      params: { a: "a" },
    });
    expect(document.URL).to.equal("http://localhost/?foo=foo&bar=bar&a=a");
    urlDispatch({ type: "query" });
    expect(document.URL).to.equal("http://localhost/?foo=foo&bar=bar");
  });
});
