import { expect } from "chai";
import { jsdom } from "reshow-unit";
import { doc } from "win-doc";

import updateCanonicalUrl, {
  initCanonicalUrl,
  getDocCanonicalUrl,
} from "../updateCanonicalUrl";

describe("Test handle CanonicalUrl", () => {
  let reset;
  before(() => {
    reset = jsdom(null, { url: "http://localhost" });
  });

  after(() => {
    reset();
  });

  it("Get doc canonicalUrl", () => {
    document.body.innerHTML =
      '<link rel="canonical" href="http://localhost" />';
    const url = getDocCanonicalUrl();
    expect(url).to.equal("http://localhost/");
  });

  it("updateCanonicalUrl Simple test.", () => {
    updateCanonicalUrl();
  });

  it("initCanonicalUrl Simple test.", () => {
    initCanonicalUrl();
  });
});
