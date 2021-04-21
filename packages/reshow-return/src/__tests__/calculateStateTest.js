import { expect } from "chai";
import { pageStore, dispatch } from "reshow";
import { Map } from "immutable";

import options from "../returnOptions";

const {calculateState} = options;  


describe("Test calculateState", () => {
  beforeEach(() => {
    dispatch("config/reset", { foo: {bar: {foo1: 'bar1'}} });
  });

  it("path data with immutable", ()=>{
    const acture = calculateState({}, {
      initStates: ['foo'],
      pathStates: {bar: ['foo', 'bar']},
      immutable: true,
    }, [pageStore]);
    expect(acture.bar instanceof Map).to.be.true;
  });

  it("path data with immutable not exits", ()=>{
    const acture = calculateState({}, {
      pathStates: {bar: ['foo', 'bar']},
      immutable: true,
    }, [pageStore]);
    expect(acture.bar).to.be.undefined;
  });

  it("path data with non immutable", ()=>{
    const acture = calculateState({}, {
      initStates: ['foo'],
      pathStates: {bar: ['foo', 'bar']},
    }, [pageStore]);
    expect(acture.bar).to.deep.equal({foo1: 'bar1'});
  });
});
