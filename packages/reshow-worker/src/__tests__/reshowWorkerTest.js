import { expect } from "chai";
import sinon from "sinon";

import initWorker from "../index.js";

const Worker = () => ({ addEventListener: () => {} });

describe("Test reshowWorker", () => {
  it("test init", () => {
    const win = { Worker, navigator: {} };
    initWorker({ win });
  });

  it("test import is call", () => {
    const win = { Worker };
    const cb = sinon.spy();
    initWorker({ win, cb });
    expect(cb.called).to.be.true;
  });

  it("test unregister sw", () => {
    const fakeCb = sinon.spy();
    const win = {
      Worker,
      navigator: {
        serviceWorker: {
          getRegistrations: () => {
            return {
              then: (thenCb) => {
                thenCb([{ unregister: fakeCb }]);
              },
            };
          },
        },
      },
    };
    initWorker({ win });
    expect(fakeCb.called).to.be.true;
  });
});
