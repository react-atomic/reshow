'use strict';

import React, {Component, StrictMode} from 'react';
import {connect, Dispatcher, ReduceStore} from '../../src/index';
import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('Test Connect', () => {
  class FakeStore extends ReduceStore {
    getInitialState() {
      return [];
    }

    reduce(state, action) {
      return action;
    }
  }
  let dispatcher;
  let store;
  beforeEach(() => {
    dispatcher = new Dispatcher();
    store = new FakeStore(dispatcher);
  });

  it('could register with store', () => {
    class FakeComponent extends Component {
      static getStores() {
        return [store];
      }

      static calculateState(prevState) {
        return {foo: 'bar'};
      }

      render() {
        return <div>{this.state.foo}</div>;
      }
    }
    let FakeConnected = connect(FakeComponent);
    let vDom = <FakeConnected />;
    const actual = shallow(vDom).html();
    expect(actual).to.equal('<div>bar</div>');
  });

  it('could work with dispatcher', () => {
    let calculateTimes = 0;
    class FakeComponent extends Component {
      static getStores() {
        return [store];
      }

      static calculateState(prevState) {
        const state = store.getState();
        calculateTimes++;
        return {aaa: state.aaa};
      }

      render() {
        return <div>{this.state.aaa}</div>;
      }
    }
    const FakeConnected = connect(FakeComponent);
    expect(calculateTimes).to.equal(0);
    const vDom = <FakeConnected />;
    expect(calculateTimes).to.equal(0);
    const html = shallow(vDom);
    expect(calculateTimes).to.equal(1);
    dispatcher.dispatch({aaa: 'Hello dispatcher!'});
    html.update();
    expect(calculateTimes).to.equal(2);
    expect(html.html()).to.equal('<div>Hello dispatcher!</div>');
    html.unmount();
    dispatcher.dispatch({aaa: 'Hello Unmount!'});
    expect(calculateTimes).to.equal(2);
  });

  it('could work withProps', () => {
    let getStoresProps = null;
    let calculateStateProps = null;
    class FakeComponent extends Component {
      static getStores(props) {
        getStoresProps = props;
        return [store];
      }

      static calculateState(prevState, props) {
        calculateStateProps = props;
        const state = store.getState();
        return {foo: props.foo};
      }

      render() {
        return <div>{this.state.foo}</div>;
      }
    }
    const FakeConnected = connect(
      FakeComponent,
      {
        withProps: true,
      },
    );
    let changeFoo;
    class Parent extends Component {
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
    const html = mount(vDom);
    expect(getStoresProps).to.deep.equal({foo: null});
    expect(calculateStateProps).to.deep.equal({foo: null});
    changeFoo('bar');
    expect(html.html()).to.equal('<div>bar</div>');
    expect(getStoresProps).to.deep.equal({foo: 'bar'});
    expect(calculateStateProps).to.deep.equal({foo: 'bar'});
  });

  it('could work with getDerivedStateFromProps override', () => {
    class FakeComponent extends Component {
      static getStores(props) {
        return [store];
      }

      static calculateState(prevState, props) {
        const state = store.getState();
        return {
          ...props,
          testMerge: prevState.testMerge+1
        }
      }

      static getDerivedStateFromProps(nextProps, prevState) {
        const keys = Object.keys;
        return {
          testMerge: prevState.testMerge || 0,
          kProps: keys(nextProps),
          kState: keys(prevState),
        };
      }

      render() {
        return <div>{this.state.foo}</div>;
      }
    }
    const FakeConnected = connect(
      FakeComponent,
      {
        withProps: true,
      },
    );
    let change1;
    let change2;
    let child1;
    let child2;
    class Parent extends Component {
      constructor(props) {
        super(props);
        change1 = v => this.setState({child1: v});
        change2 = v => this.setState({child2: v});

        this.state = {};
      }

      render() {
        return (
          <div>
            <FakeConnected {...this.state.child1} ref={el => (child1 = el)} />
            <FakeConnected {...this.state.child2} ref={el => (child2 = el)} />
          </div>
        );
      }
    }
    const vDom = <Parent />;
    const html = mount(vDom);
    expect(child1.state).to.deep.equal({kProps: [], kState: [], testMerge: 1});
    expect(child2.state).to.deep.equal({kProps: [], kState: [], testMerge: 1});
    change1({foo: 'bar'});
    expect(child1.state).to.deep.equal({
      kProps: ['foo'],
      kState: ['testMerge', 'kProps', 'kState',],
      foo: 'bar',
      testMerge: 2,
    });
    change2({bar: 'foo'});
    expect(child2.state).to.deep.equal({
      kProps: ['bar'],
      kState: ['testMerge', 'kProps', 'kState'],
      bar: 'foo',
      testMerge: 3,
    });
  });

  it('could work withConstructor equal true', () => {
    class FakeComponent extends Component {
      didMount = false;
      static getStores() {
        return [store];
      }

      static calculateState(prevState) {
        return {foo: 'bar'};
      }

      componentDidMount() {
        this.didMount = true;
      }

      render() {
        return <div>{this.state.foo}</div>;
      }
    }
    let FakeConnected = connect(
      FakeComponent,
      {
        withConstructor: true,
      },
    );
    let vDom = <FakeConnected />;
    const html = shallow(vDom, {
      disableLifecycleMethods: true,
    });
    const instance = html.instance();
    expect(instance.didMount).to.equal(false);
    expect(instance.__stores).to.have.lengthOf(1);
  });

  it('could work withConstructor equal false', () => {
    class FakeComponent extends Component {
      didMount = false;
      static getStores() {
        return [store];
      }

      static calculateState(prevState) {
        return {foo: 'bar'};
      }

      componentDidMount() {
        this.didMount = true;
      }

      render() {
        return <div>{this.state.foo}</div>;
      }
    }
    let FakeConnected = connect(
      FakeComponent,
      {
        withConstructor: false,
      },
    );
    let vDom = <FakeConnected />;
    const html = shallow(vDom);
    const instance = html.instance();
    expect(instance.didMount).to.equal(true);
    expect(instance.__stores).to.have.lengthOf(1);
  });

  it('could work with empty calculateState', () => {
    class FakeComponent extends Component {
      static getStores() {
        return [store];
      }

      static calculateState(prevState) {}

      render() {
        return <div>{this.state.foo}</div>;
      }
    }
    const FakeConnected = connect(FakeComponent);
    let vDom = <FakeConnected />;
    const html = shallow(vDom);
    const state = html.state();
    expect(state).to.be.empty;
  });
});
