'use strict';

import {Dispatcher, BaseReduceStore} from '../../src/index';
import {expect} from 'chai';

describe('Test Store', ()=>{ 
    class FakeStore extends BaseReduceStore
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
        const dispatcher = new Dispatcher();
        const store = new FakeStore(dispatcher); 
        const action = {aaa:'bbb'};
        dispatcher.dispatch(action);
        const state = store.getState();
        expect(state).to.equal(action);
    });


    it('dispatch with empty', ()=>{
        const dispatcher = new Dispatcher();
        const store = new FakeStore(dispatcher); 
        dispatcher.dispatch();
        const state = store.getState();
        expect(state).to.be.empty;
    });
});
