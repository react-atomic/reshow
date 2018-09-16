'use strict';

import {Dispatcher, Store} from '../../cjs/index';
import {expect} from 'chai';
import sinon from 'sinon';

describe('Test Store', () => {
  class FakeStore extends Store {
    getInitialState() {
      return [];
    }

    reduce(state, action) {
      return action;
    }
  }

  it('could register with dispatcher', () => {
    const dispatcher = new Dispatcher();
    const store = new FakeStore(dispatcher);
    const action = {aaa: 'bbb'};
    dispatcher.dispatch(action);
    const state = store.getState();
    expect(state).to.equal(action);
  });

  it('dispatch with empty', () => {
    const dispatcher = new Dispatcher();
    const store = new FakeStore(dispatcher);
    dispatcher.dispatch();
    const state = store.getState();
    expect(state).to.be.empty;
  });

  it('Emit with custom event', () => {
    const dispatcher = new Dispatcher();
    const store = new FakeStore(dispatcher);
    const callback = sinon.spy();
    store.addListener(callback, 'test');
    expect(callback.called).to.be.false;
    store.nextEmits.push('test');
    dispatcher.dispatch();
    expect(callback.called).to.be.true;
  });
});
