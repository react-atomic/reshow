import React, {PureComponent} from 'react';
import {pageStore, dispatch} from 'reshow';

import Return from '../Return';

import chai, {expect} from 'chai';

import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('Test Return', () => {
  class TestEl extends PureComponent {
    render() {
      return <div />;
    }
  }

  class FakeComponent extends PureComponent {
    state = {};

    setNew(k, v) {
      this.setState({[k]: v});
    }

    render() {
      const {immutable} = this.props;
      return (
        <Return
          stores={[pageStore]}
          immutable={immutable}
          initStates={['data', 'I18N']}
          pathStates={{I13N: ['data', 'I13N']}}>
          <TestEl ref={el => (this.el = el)} {...this.state} />
        </Return>
      );
    }
  }

  beforeEach(() => dispatch('config/reset'));

  it('assign props', () => {
    const vDom = <FakeComponent />;
    const uFake = mount(vDom).instance();
    dispatch({data: {foo: 'bar', I13N: {aaa: 'bbb'}}});
    expect(uFake.el.props.data).to.deep.equal({foo: 'bar', I13N: {aaa: 'bbb'}});
    expect(uFake.el.props.I13N).to.deep.equal({aaa: 'bbb'});
  });

  it('test Immutable path state', () => {
    const vDom = <FakeComponent immutable />;
    const uFake = mount(vDom).instance();
    dispatch({
      data: {foo: 'bar', I13N: {a: 'b'}},
    });
    const firstData = uFake.el.props.data;
    const firstI13N = uFake.el.props.I13N;
    uFake.setNew('bar', 'bbb');
    const secondData = uFake.el.props.data;
    const secondI13N = uFake.el.props.I13N;
    expect(firstData === secondData).to.be.true;
    expect(firstI13N === secondI13N).to.be.true;
    expect(firstData.toJS()).to.deep.equal({foo: 'bar', I13N: {a: 'b'}});
    expect(firstI13N.toJS()).to.deep.equal({a: 'b'});
  });

  it('test path state should clean', () => {
    const vDom = <FakeComponent immutable />;
    const uFake = mount(vDom).instance();
    const vDom1 = <FakeComponent />;
    const uFake1 = mount(vDom1).instance();
    dispatch({data: ''});
    expect(uFake.el.props.I13N).to.undefined;
    expect(uFake1.el.props.I13N).to.undefined;
  });

  it('test child with function', () => {
    let i = 0;
    const vDom = (
      <Return stores={[pageStore]} initStates={['data']}>
        {props => {
          if (i) {
            expect(props).to.deep.equal({data: 'foo'});
          } else {
            i++;
          }
          return <div />;
        }}
      </Return>
    );
    const wrap = mount(vDom);
    dispatch({
      data: 'foo',
    });
    wrap.unmount();
  });

  it('test store not defined', () => {
    expect(() => mount(<Return />)).to.throw();
  });
});
