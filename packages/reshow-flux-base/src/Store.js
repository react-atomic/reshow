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
    this.nextAsync = false;
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
    if (this.nextEmits.length) {
      const nextRun = () => {
        while (this.nextEmits.length) {
          this.emit(this.nextEmits.shift(), { state: endingState, action });
        }
      };
      if (this.nextAsync) {
        this.nextAsync = false;
        setTimeout(nextRun);
      } else {
        nextRun();
      }
    }
  };

  // mitt event
  emit = (e, payload) => this.mitt.emit(e, payload);
  addListener = (listener, e) => this.mitt.on(e, listener);
  removeListener = (listener, e) => this.mitt.off(e, listener);
}

export default Store;
export { CHANGE };
