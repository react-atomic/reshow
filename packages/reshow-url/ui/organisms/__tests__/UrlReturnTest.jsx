import jsdom from 'jsdom-global';
jsdom(null, {url: 'http://localhost'});

import React, {PureComponent} from 'react';
import {urlStore, UrlReturn, urlDispatch} from '../../../src/index';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('Test Url Return', () => {
  class TestEl extends PureComponent {
    show = 0;
    render() {
      this.show++;
      return <div />;
    }
  }

  class FakeComponent extends PureComponent {
    render() {
      const {urlKey} = this.props;
      return (
        <UrlReturn initStates={[urlKey]}>
          <TestEl ref={el => (this.el = el)} />
        </UrlReturn>
      );
    }
  }
  it('test get pathname', () => {
    const vDom = <FakeComponent urlKey=":pathname" />;
    const uFake = mount(vDom).instance();
    urlDispatch({type: 'url', url: 'http://localhost/aaa'});
    expect(uFake.el.props[':pathname']).to.deep.equal(['', 'aaa']);
  });

  it('test get query', () => {
    const vDom = <FakeComponent urlKey="foo" />;
    const uFake = mount(vDom).instance();
    urlDispatch({type: 'query', params: {foo: 'bar'}});
    expect(uFake.el.props['foo']).to.equal('bar');
  });

  it('test trigger by history', done => {
    const vDom = <FakeComponent urlKey=":pathname" />;
    const uFake = mount(vDom).instance();
    urlStore.registerEvent(window);
    window.history.pushState(null, 'title', 'http://localhost/bbb');
    window.history.pushState(null, 'title', 'http://localhost/ccc');
    window.history.back();
    setTimeout(() => {
      expect(uFake.el.props[':pathname']).to.deep.equal(['', 'bbb']);
      done();
    }, 500);
  });
});
