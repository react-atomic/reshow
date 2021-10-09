import { expect } from "chai";

import ReduceStore, {Map} from "../ReduceStore";
import { Dispatcher } from "reshow-flux-base";

describe("Test immutable", ()=>{
  class FakeStore extends ReduceStore {
    reduce(state, action) {
      return this.mergeMap(state, action);
    }
  }

  it("basic test", (done)=>{
    const dispatcher = new Dispatcher();
    const store = new FakeStore(dispatcher);
    const action = { aaa: {bbb: "ccc"} };
    dispatcher.dispatch(action);
    setTimeout(() => {
      const state = store.getState();
      expect(Map.isMap(state.get('aaa'))).to.be.true;
      expect(state.get('aaa').toJS()).to.deep.equal({bbb: "ccc"});
      done();
    }, 50);
  });
});
