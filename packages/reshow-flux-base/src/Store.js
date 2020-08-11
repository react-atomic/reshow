import "setimmediate";
import mitt from "./mitt";

const CHANGE = "chg";

class Store {
  reduce() {
    console.error("Not override reduce().");
  }

  getInitialState() {
    console.error("Not override getInitialState().");
  }

  equals(one, two) {
    return one === two;
  }

  constructor(dispatcher) {
    dispatcher.register(this.__invokeOnDispatch);
    this._state = this.reset();
  }

  reset() {
    this.mitt = new mitt();
    this.nextEmits = [];
    return this.getInitialState();
  }

  getState() {
    return this._state;
  }

  /* Following not extendable */

  __invokeOnDispatch = (action) => {
    const startingState = this._state;
    const endingState = this.reduce(startingState, action);
    if (endingState === undefined) {
      console.error("reduce() return undefined.");
    }
    if (!this.equals(startingState, endingState)) {
      this._state = endingState;
      this.emit(CHANGE);
    }
    const next = this.nextEmits.slice(0);
    this.nextEmits = [];
    if (next.length) {
      setImmediate(() => next.forEach((emit) => this.emit(emit)));
    }
  };

  // mitt event
  emit = (e) => this.mitt.emit(e);
  addListener = (listener, e) => this.mitt.on(e, listener);
  removeListener = (listener, e) => this.mitt.off(e, listener);
}

export default Store;
export { CHANGE };
