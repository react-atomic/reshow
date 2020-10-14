import React, {PureComponent} from 'react';
import {RealTimeReturn, dispatch} from '../../../src/index';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('Test RealTimeReturn', () => {
  class TestEl extends PureComponent {
    render() {
      return <div />;
    }
  }

  class FakeComponent extends PureComponent {
    render() {
      const {realTimeReset} = this.props;
      return (
        <RealTimeReturn realTimeReset={realTimeReset} realTimePath={['r']}>
          <TestEl ref={el => (this.el = el)} />
        </RealTimeReturn>
      );
    }
  }
  let uWrap;
  afterEach(() => {
    uWrap.unmount();
  });
  it('dispatch pageStore first', done => {
    const vDom = <FakeComponent />;
    uWrap = mount(vDom);
    const uFake = uWrap.instance();
    dispatch({data: 'foo'});
    setTimeout(() => {
      uWrap.update();
      expect(uFake.el.props.data).to.equal('foo');
      dispatch({type: 'realTime', params: {r: {data: 'bar'}}});
      setTimeout(() => {
        expect(uFake.el.props.data).to.equal('bar');
        done();
      }, 200);
    });
  });

  it('dispatch realtime first', done => {
    const vDom = <FakeComponent />;
    uWrap = mount(vDom);
    const uFake = uWrap.instance();
    dispatch({type: 'realTime', params: {r: {data: 'bar'}}});
    setTimeout(() => {
      expect(uFake.el.props.data).to.equal('bar');
      dispatch({data: 'foo'});
      setTimeout(() => {
        expect(uFake.el.props.data).to.equal('bar');
        done();
      })
    });
  });

  it('test realtime reset', done => {
    const vDom = <FakeComponent realTimeReset={true} />;
    uWrap = mount(vDom);
    const uFake = uWrap.instance();
    dispatch({type: 'realTime', params: {r: {data: 'bar'}}});
    setTimeout(() => {
      expect(uFake.el.props.data).to.equal('bar');
      dispatch({data: 'foo'});
      setTimeout(() => {
        expect(uFake.el.props.data).to.be.null;
        done();
      }, 200);
    }, 100);
  });
});
