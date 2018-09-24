import mitt from 'mitt';

const CHANGE = 'chg';

class Store {
  reduce() {
    console.error('Not override reduce().');
  }

  getInitialState() {
    console.error('Not override getInitialState().');
  }

  equals(one, two) {
    return one === two;
  }

  constructor(dispatcher) {
    dispatcher.register(action => this.__invokeOnDispatch(action));
    this._state = this.getInitialState();
  }

  /* Following not extendable */
  getState = () => this._state;

  nextEmits = [];

  __invokeOnDispatch = action => {
    const startingState = this._state;
    const endingState = this.reduce(startingState, action);
    if (endingState === undefined) {
      console.error('reduce() return undefined.');
    }
    if (!this.equals(startingState, endingState)) {
      this._state = endingState;
      this.emit(CHANGE);
    }
    const next = this.nextEmits.slice(0);
    this.nextEmits = [];
    next.forEach(emit => this.emit(emit));
  };

  // mitt event
  mitt = new mitt();
  emit = e => this.mitt.emit(e);
  addListener = (listener, e) => this.mitt.on(e, listener);
  removeListener = (listener, e) => this.mitt.off(e, listener);
}

export default Store;
export {CHANGE};
