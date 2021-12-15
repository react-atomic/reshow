const getYo = require("../index");
const { YoTest, assert } = getYo();

describe("CopyTplWithFolder Test", () => {
  before((done) => {
    YoTest({
      folder: __dirname + "/fakeGenerator",
      done,
      params: {
        fakeName: "bar",
      },
    });
  });
  it("basic test", ()=>{
  });
});
