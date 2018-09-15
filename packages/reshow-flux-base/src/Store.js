import mitt from 'mitt';

const CHANGE_EVENT = 'chg';

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

  __invokeOnDispatch = action => {
    const startingState = this._state;
    const endingState = this.reduce(startingState, action);
    if (endingState === undefined) {
      console.error('reduce() return undefined.');
    }
    if (!this.equals(startingState, endingState)) {
      this._state = endingState;
      this.emit(CHANGE_EVENT);
    }
  };

  // mitt event
  mitt = new mitt();
  emit = e => this.mitt.emit(e);
  addListener = (listener, e) => this.mitt.on(e ? e : CHANGE_EVENT, listener);
  removeListener = (listener, e) =>
    this.mitt.off(e ? e : CHANGE_EVENT, listener);
}

export default Store;
