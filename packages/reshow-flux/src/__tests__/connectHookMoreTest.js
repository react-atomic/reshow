import React, {Component, StrictMode} from 'react';
import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import connectHook from '../connectHook';
import ReduceStore from '../ReduceStore';
import {Dispatcher} from '../index';
import {CHANGE} from 'reshow-flux-base';

describe('Test Connect hook for more test', () => {
  class FakeStore extends ReduceStore {
    getInitialState() {
      return {foo: 'bar'};
    }

    reduce(state, action) {
      return action;
    }
  }
  let dispatcher;
  let dispatch;
  let store;
  beforeEach(() => {
    dispatcher = new Dispatcher();
    dispatch = dispatcher.dispatch;
    store = new FakeStore(dispatcher);
  });

  it('could register with store', () => {
    const FakeComponent = ({foo}) => <div>{foo}</div>;
    const FakeConnected = connectHook(FakeComponent, {
      calculateState: (prevState, props) => {
        if (!prevState.__init__) {
          return {__init__: true};
        } else {
          return {
            foo: store.getState().foo,
          };
        }
      },
      getStores: props => [store],
    });
    let vDom = <FakeConnected />;
    const wrap = mount(vDom);
    store.emit(CHANGE);
    expect(wrap.html()).to.equal('<div>bar</div>');
  });

  it('could work with dispatcher', done => {
    let calculateTimes = 0;
    const FakeComponent = ({aaa}) => <div>{aaa}</div>;
    const FakeConnected = connectHook(FakeComponent, {
      calculateState: (prevState, props) => {
        const state = store.getState();
        calculateTimes++;
        return {aaa: state.aaa};
      },
      getStores: props => [store],
    });
    expect(calculateTimes).to.equal(0);
    const vDom = <FakeConnected />;
    expect(calculateTimes).to.equal(0);
    const html = mount(vDom);
    expect(calculateTimes).to.equal(2); //init and handlchange
    dispatch({aaa: 'Hello dispatcher!'});
    setTimeout(() => {
      html.update();
      expect(calculateTimes).to.equal(3);
      expect(html.html()).to.equal('<div>Hello dispatcher!</div>');
      html.unmount();
      dispatch({aaa: 'Hello Unmount!'});
      expect(calculateTimes).to.equal(3);
      done();
    }, 50);
  });

  it('could work withProps', done => {
    let getStoresProps = null;
    let calculateStateProps = null;
    const FakeComponent = ({foo}) => <div>{foo}</div>;
    const FakeConnected = connectHook(FakeComponent, {
      calculateState: (prevState, props) => {
        calculateStateProps = {...props};
        return {foo: props.foo};
      },
      getStores: props => {
        getStoresProps = props;
        return [store];
      },
    });
    let changeFoo;
    class Parent extends Component {
      state = {};

      constructor(props) {
        super(props);
        changeFoo = v => {
          this.setState({foo: v});
        };
      }

      render() {
        let foo = null;
        if (this.state && this.state.foo) {
          foo = this.state.foo;
        }
        return <FakeConnected foo={foo} />;
      }
    }
    const vDom = <Parent />;
    const wrap = mount(vDom);

    expect(getStoresProps).to.deep.equal({foo: null});
    expect(calculateStateProps).to.deep.equal({foo: null});
    changeFoo('bar');
    wrap.update();
    setTimeout(() => {
      expect(wrap.html()).to.equal('<div>bar</div>');
      expect(getStoresProps).to.deep.equal({foo: 'bar'});
      expect(calculateStateProps).to.deep.equal({foo: 'bar'});
      done();
    });
  });

  it('could work with empty calculateState', () => {
    const FakeComponent = ({foo}) => <div>{foo}</div>;
    const FakeConnected = connectHook(FakeComponent, {
      calculateState: (prevState, props) => {},
      getStores: props => [store],
    });
    let vDom = <FakeConnected aaa="bbb" />;
    const wrap = mount(vDom);
    const props = wrap.props();
    expect(props).to.deep.equal({aaa: 'bbb'});
  });
});
