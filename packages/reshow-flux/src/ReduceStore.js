import mitt from "mitt";
import {Map} from 'immutable';

const CHANGE_EVENT = 'change';

class MittStore
{

  reduce()
  {
      console.error('You should override reduce() function.');
  }

  __emitChange = () => this.__changed = true;

  getState = () => this._state;

  getInitialState()
  {
    return Map();
  }

  areEqual(one, two)
  {
      return one === two;
  }

  constructor(dispatcher)
  {
    this.mitt = new mitt();
    dispatcher.register((payload) => {
        this.__invokeOnDispatch(payload);
    });
    this._state = this.getInitialState();
  }

  getMap = (k, state)=>
  {
      if (!state) {
          state = this.getState();
      }
      let v = state.get(k);
      if (v && v.toJS) {
          v = v.toJS();
      }
      if (!v) {
          v = {};
      }
      return v;
  }

  __invokeOnDispatch = action =>
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

}

export default MittStore;
