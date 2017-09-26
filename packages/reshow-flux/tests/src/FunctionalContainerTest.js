'use strict';

import React from 'react';
import {
    Dispatcher,
    ReduceStore,
    FunctionalContainer 
} from '../../src/index';
import {expect} from 'chai';
import {shallow} from 'enzyme';

describe('Test Functional Container', ()=>{ 
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
    let dispatcher = new Dispatcher();
    let store = new FakeStore(dispatcher); 
    it('could register with store', ()=>{
        const FakeComponent = ({aaa}) => 
            <div>{aaa}</div>;
        const fakeGetStores = () => [store];
        const fakeCalculateState = (prevState) => {
            const state = store.getState();
            return {aaa:state.aaa};
        };
        let FakeContainer = FunctionalContainer(
            FakeComponent,
            fakeGetStores,
            fakeCalculateState
        ); 
        let vDom = <FakeContainer />;
        const html  = shallow(vDom);
        dispatcher.dispatch({aaa: 'Hello dispatcher!'});
        expect(html.html()).to.equal('<div>Hello dispatcher!</div>');
    });
});
