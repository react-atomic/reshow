import mitt from 'mitt';

const CHANGE_EVENT = 'change';

class BaseReduceStore {
  reduce() {
    console.error('You should override reduce() function.');
  }

  getInitialState() {
    console.error('You should override getInitialState() function.');
  }

  areEqual(one, two) {
    return one === two;
  }

  constructor(dispatcher) {
    dispatcher.register(action => this.__invokeOnDispatch(action));
  }

  /* Following not extendable */

  _state = this.getInitialState();
  getState = () => this._state;

  __invokeOnDispatch = action => {
    const startingState = this._state;
    const endingState = this.reduce(startingState, action);
    if (endingState === undefined) {
      console.error('returned undefined from reduce(...)');
    }
    if (!this.areEqual(startingState, endingState)) {
      this._state = endingState;
      this.mitt.emit(CHANGE_EVENT);
    }
  };

  // mitt event
  mitt = new mitt();
  addListener = listener => this.mitt.on(CHANGE_EVENT, listener);
  removeListener = listener => this.mitt.off(CHANGE_EVENT, listener);
}

export default BaseReduceStore;
