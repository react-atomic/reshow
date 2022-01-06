import { expect } from "chai";
import { Dispatcher, ReduceStore } from "reshow-flux";
import { Map } from "immutable";

import options from "../connectOptions";

const { calculateState } = options;

class PageStore extends ReduceStore {
  reduce(state, action) {
    switch (action.type) {
      case "config/reset":
        return state.clear().merge(action.params);
      default:
        if (Object.keys(action)) {
          return state.merge(action);
        } else {
          return state;
        }
    }
  }
}

const dispatcher = new Dispatcher();
const pageStore = new PageStore(dispatcher);
const dispatch = dispatcher.dispatch;

describe("Test calculateState", () => {
  beforeEach(() => {
    dispatch("config/reset", { foo: { bar: { foo1: "bar1" } } });
  });

  it("path data with immutable", () => {
    const actual = calculateState(
      {},
      {
        initStates: ["foo"],
        pathStates: { bar: ["foo", "bar"] },
        immutable: true,
      },
      {
        storeLocator: () => pageStore,
      },
    );
    expect(actual.bar instanceof Map).to.be.true;
  });

  it("path data with immutable not exits", () => {
    const acture = calculateState(
      {},
      {
        pathStates: { bar: ["foo", "bar"] },
        immutable: true,
      },
      {
        storeLocator: () => pageStore,
      }
    );
    expect(acture.bar).to.be.undefined;
  });

  it("path data with non immutable", () => {
    const acture = calculateState(
      {},
      {
        initStates: ["foo"],
        pathStates: { bar: ["foo", "bar"] },
      },
      {
        storeLocator: () => pageStore,
      }
    );
    expect(acture.bar).to.deep.equal({ foo1: "bar1" });
  });
});
