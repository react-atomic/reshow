'use strict';

import React, {Component} from 'react';
import {
    connect,
    Dispatcher,
    ReduceStore,
} from '../../src/index';
import {expect} from 'chai';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });



describe('Test Connect', ()=>{ 
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
    let dispatcher;
    let store; 
    beforeEach(()=>{
        dispatcher = new Dispatcher();
        store = new FakeStore(dispatcher); 
    });
    it('could register with store', ()=>{
       class FakeComponent extends Component
       {
            static getStores()
            {
                return [store];
            }

            static calculateState(prevState)
            {
                return {foo:'bar'};
            }

            render()
            {
                return <div>{this.state.foo}</div>;
            }
       }
       let FakeConnected = connect(FakeComponent); 
       let vDom = <FakeConnected />;
       const actual = shallow(vDom).html();
       expect(actual).to.equal('<div>bar</div>');
    });

    
    it('could work with dispatcher', ()=>{
       let calculateTimes = 0;
       class FakeComponent extends Component
       {
            static getStores()
            {
                return [store];
            }

            static calculateState(prevState)
            {
                const state = store.getState();
                calculateTimes++;
                return {aaa:state.aaa};
            }

            render()
            {
                return <div>{this.state.aaa}</div>;
            }
       }
       const FakeConnected = connect(FakeComponent); 
       expect(calculateTimes).to.equal(0);
       const vDom = <FakeConnected />;
       expect(calculateTimes).to.equal(0);
       const html  = shallow(vDom);
       expect(calculateTimes).to.equal(1);
       dispatcher.dispatch({aaa: 'Hello dispatcher!'});
       html.update();
       expect(calculateTimes).to.equal(2);
       expect(html.html()).to.equal('<div>Hello dispatcher!</div>');
       html.unmount();
       dispatcher.dispatch({aaa: 'Hello Unmount!'});
       expect(calculateTimes).to.equal(2);
    });

    it('could work with props', ()=>{
       let getStoresProps = null;
       let calculateStateProps = null;
       class FakeComponent extends Component
       {
            static getStores(props)
            {
                getStoresProps = props;
                return [store];
            }

            static calculateState(prevState, props)
            {
                calculateStateProps = props;
                const state = store.getState();
                return {foo: props.foo};
            }

            render()
            {
                return <div>{this.state.foo}</div>;
            }
       }
       const FakeConnected = connect(
            FakeComponent,
            {
                withProps: true
            }
        ); 
       let changeFoo;
       class Parent extends Component
       {
            constructor(props) 
            {
                super(props);
                changeFoo = (v) => {
                    this.setState({foo: v});
                };
            }

            render()
            {
                let foo = null;
                if (this.state && this.state.foo) {
                    foo = this.state.foo; 
                }
                return <FakeConnected foo={foo} />;
            }
       }
       const vDom = <Parent />;
       const html  = shallow(vDom);
       expect(getStoresProps).to.equal(null);
       expect(calculateStateProps).to.equal(null);
       let actual = html.html();
       expect(getStoresProps).to.deep.equal({ foo: null });
       expect(calculateStateProps).to.deep.equal({ foo: null });
       changeFoo('bar'); 
       html.update();
       expect(html.html()).to.equal('<div>bar</div>');
       expect(getStoresProps).to.deep.equal({ foo: 'bar' });
       expect(calculateStateProps).to.deep.equal({ foo: 'bar' });
    });
});
