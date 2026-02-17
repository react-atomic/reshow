const { YoHelper } = require("../index");

describe("mkdirp", () => {
  it("test mkdirp", () => {
    const mockGen = {
      destinationPath: (path) => path
    };
    const { mkdir } = YoHelper(mockGen);
    return mkdir("/tmp/testfoo").then(() => {
      // do nothing
    });
  });
});
