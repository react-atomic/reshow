import React, {PureComponent} from 'react';
import {Section, dispatch} from '../../../src/index';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('Test Section', () => {
  class TestEl extends PureComponent {
    render() {
      return <div />;
    }
  }

  class FakeComponent extends PureComponent {
    static defaultProps = {
      name: 'test',
    };

    render() {
      const {immutable, name} = this.props;
      return (
        <Section name={name} immutable={immutable}>
          <TestEl ref={el => (this.el = el)} />
        </Section>
      );
    }
  }

  beforeEach(() => dispatch('config/reset'));

  it('Section is existed', () => {
    const vDom = <FakeComponent />;
    const uFake = mount(vDom).instance();
    dispatch({
      section: {
        test: {
          shouldRender: true,
          aaa: {bbb: 'ccc'},
        },
      },
      I18N: {ddd: 'fff'},
    });
    expect(uFake.el.props.aaa).to.deep.equal({bbb: 'ccc'});
    expect(uFake.el.props.I18N).to.deep.equal({ddd: 'fff'});
  });

  it('Section is not existed', () => {
    const vDom = <FakeComponent name="xxx" />;
    const uFake = mount(vDom).instance();
    dispatch({
      section: null,
    });
    expect('undefined' === typeof uFake.el).to.be.true;
  });

  it('Section is existed with immutable', () => {
    const vDom = <FakeComponent immutable />;
    const uFake = mount(vDom).instance();
    dispatch({
      section: {
        test: {
          shouldRender: true,
          aaa: {bbb: 'ccc'},
        },
      },
      I18N: {ddd: 'fff'},
    });
    expect(uFake.el.props.aaa.toJS()).to.deep.equal({bbb: 'ccc'});
    expect(uFake.el.props.I18N.toJS()).to.deep.equal({ddd: 'fff'});
  });

  it('Section is not existed with immutable', () => {
    const vDom = <FakeComponent name="xxx" immutable />;
    const uFake = mount(vDom).instance();
    dispatch({
      section: null,
    });
    expect('undefined' === typeof uFake.el).to.be.true;
  });

  it('pass name to child', () => {
    class PassName extends PureComponent {
      render() {
        const {immutable, name} = this.props;
        return (
          <Section name="test">
            <div ref={el => (this.el = el)} />
          </Section>
        );
      }
    }
    const vDom = <PassName />;
    const wrap = mount(vDom).instance();
    dispatch({
      section: {
        test: {
          shouldRender: true,
          aaa: {bbb: 'ccc'},
        },
      }
    });
    expect(wrap.el.getAttribute('name')).to.equal('test');
  });

  it('not pass name if child already have name', () => {
    class NotPassName extends PureComponent {
      render() {
        const {immutable, name} = this.props;
        return (
          <Section name="test">
            <div name="test2" ref={el => (this.el = el)} />
          </Section>
        );
      }
    }
    const vDom = <NotPassName />;
    const wrap = mount(vDom).instance();
    dispatch({
      section: {
        test: {
          shouldRender: true,
          aaa: {bbb: 'ccc'},
        },
      }
    });
    expect(wrap.el.getAttribute('name')).to.equal('test2');
  });

  it('not pass name if one of child already have name', () => {
    class NotPassNameMultiChild extends PureComponent {
      render() {
        const {immutable, name} = this.props;
        return (
          <Section name="test">
            <div ref={el => (this.el1 = el)} />
            <div name="test2" ref={el => (this.el2 = el)} />
          </Section>
        );
      }
    }
    const vDom = <NotPassNameMultiChild />;
    const wrap = mount(vDom).instance();
    dispatch({
      section: {
        test: {
          shouldRender: true,
          aaa: {bbb: 'ccc'},
        },
      }
    });
    expect(wrap.el1.getAttribute('name')).to.be.null;
    expect(wrap.el2.getAttribute('name')).to.equal('test2');
  });
});
