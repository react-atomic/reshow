import mitt from "mitt";

const CHANGE_EVENT = 'change';

class MittStore {

  getInitialState()
  {
      console.error('You should override getInitialState() function.');
  }

  reduce()
  {
      console.error('You should override reduce() function.');
  }

  constructor(dispatcher)
  {
    this.mitt = new mitt();
    dispatcher.register((payload) => {
        this.__invokeOnDispatch(payload);
    });
    this._state = this.getInitialState();
  }

  getState()
  {
      return this._state;
  }

  areEqual(one, two)
  {
    return one === two;
  }

  __invokeOnDispatch(action)
  {
      this.__changed = false;
      const startingState = this._state;
      const endingState = this.reduce(startingState, action);
      if (endingState === undefined) {
        console.error('returned undefined from reduce(...)');
      }
      if (!this.areEqual(startingState, endingState)) {
        this._state = endingState;
        this.__emitChange();
      }
      if (this.__changed) {
        this.mitt.emit(CHANGE_EVENT);
      }
  }

  addListener(listener)
  {
      this.mitt.on(CHANGE_EVENT, listener);
  }

  removeListener(listener)
  {
      this.mitt.off(CHANGE_EVENT, listener);
  }

  __emitChange()
  {
      this.__changed = true;
  }
}

export default MittStore;
