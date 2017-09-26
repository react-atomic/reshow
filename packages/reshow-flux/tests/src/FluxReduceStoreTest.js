'use strict';

import {Dispatcher, ReduceStore} from '../../src/index';
import {expect} from 'chai';

describe('Test Store', ()=>{ 
    class FakeStore extends ReduceStore
    {
        getInitialState()
        {
            return [];
        }

        reduce(state, action)
        {
            return action;
        }
    }

    it('could register with dispatcher', ()=>{
        let dispatcher = new Dispatcher();
        let store = new FakeStore(dispatcher); 
        let action = {aaa:'bbb'};
        dispatcher.dispatch(action);
        let state = store.getState();
        expect(state).to.equal(action);
    });
});
