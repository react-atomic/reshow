import { expect } from "chai";
import { ImmutableStore, Map, mergeMap, fromJS, toJS } from "reshow-flux";

import options from "../connectOptions";
const { calculateState } = options;

// Test Data
const testData = { foo: { bar: { foo1: "bar1" } } };

describe("Test calculateState", () => {
  let pageStore;
  beforeEach(() => {
    const [store, dispatch] = ImmutableStore((state, action) => {
      switch (action.type) {
        case "config/reset":
          return mergeMap(state.clear(), action.params);
        default:
          if (Object.keys(action)) {
            return mergeMap(state, action);
          } else {
            return state;
          }
      }
    });
    dispatch("config/reset", fromJS(testData));
    pageStore = store;
  });

  it("path data with immutable", () => {
    const actual = calculateState(
      {},
      {
        initStates: ["foo"],
        pathStates: { bar: ["foo", "bar"] },
        immutable: true,
        store: pageStore,
      }
    );
    expect(actual.bar instanceof Map).to.be.true;
  });

  it("path data with immutable not exits", () => {
    const acture = calculateState(
      {},
      {
        pathStates: { bar: ["foo", "bar"] },
        immutable: true,
        store: pageStore,
      }
    );
    expect(toJS(acture.bar)).to.deep.equal({ foo1: "bar1" });
    expect(acture.foo).to.be.undefined;
  });

  it("path data with non immutable", () => {
    const acture = calculateState(
      {},
      {
        initStates: ["foo"],
        pathStates: { bar: ["foo", "bar"] },
        store: pageStore,
      }
    );
    expect(acture.bar).to.deep.equal({ foo1: "bar1" });
  });


  it("path key same with data key", () => {
    const acture = calculateState(
      {},
      {
        pathStates: { foo: ["foo", "bar"] },
        immutable: true,
        store: pageStore,
      }
    );
    expect(toJS(acture.foo)).to.deep.equal({ foo1: "bar1" });
  });

});
