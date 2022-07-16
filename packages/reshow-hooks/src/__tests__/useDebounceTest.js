import { expect } from "chai";
import { render, sleep, getSinon as sinon } from "reshow-unit";

import useDebounce from "../useDebounce";

describe("test useDebounce", () => {
  it("basic test", async () => {
    const spy = sinon().spy();
    const Comp = (props) => {
      const run = useDebounce(spy, 0);
      for (let i = 0; i < 5; i++) {
        run();
      }
      return null;
    };
    render(<Comp />);
    await sleep(() => {
      expect(spy.called).to.be.true;
      expect(spy.callCount <= 2).to.be.true;
    }, 10);
  });
});
