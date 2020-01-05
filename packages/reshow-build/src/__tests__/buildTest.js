import React, {PureComponent, isValidElement, Children} from 'react';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import build from '../index';

describe('Test build', () => {
  it('test function', () => {
    const func = props => {
      expect(props.foo).to.equal('bar');
    };
    build(func)({foo: 'bar'});
  });

  it('test function with error', () => {
    const run = () => {
      build(props => {
        expect(props.foo).to.equal('bar111');
      })({foo: 'bar'});
    };
    expect(run).to.throw();
  });

  it('test function with return', () => {
    const a = build(props => props.foo)({foo: 'barbar'});
    expect(a).to.equal('barbar');
  });

  it('test with stateless function return', () => {
    const func = props => <div {...props} />;
    const a = build(func)({foo: 'barbar'});
    // will return react instance
    expect(a.props.foo).to.equal('barbar');
    expect(isValidElement(a)).to.be.true;
  });

  it('test function return another component', () => {
    class FakeComponent extends PureComponent {
      render() {
        return <div>{this.props.foo}</div>;
      }
    }
    const func = props => {
      return <FakeComponent {...props} />;
    };
    const vDom = build(func)({foo: 'bar3'});
    const html = shallow(vDom).html();
    expect(html).to.equal('<div>bar3</div>');
  });

  it('test with component', () => {
    const FakeComponent = props => <div>{props.foo}</div>;
    const vDom = build(FakeComponent)({foo: 'bar'});
    const html = shallow(vDom).html();
    expect(html).to.equal('<div>bar</div>');
  });

  it('test with instance', () => {
    const FakeComponent = props => <div>{props.foo}</div>;
    const vDom = <FakeComponent />;
    const html = shallow(build(vDom)({foo: 'bar1'})).html();
    expect(html).to.equal('<div>bar1</div>');
  });

  it('test with class component', () => {
    class FakeComponent extends PureComponent {
      render() {
        return <div>{this.props.foo}</div>;
      }
    }
    const vDom = build(FakeComponent)({foo: 'bar2'});
    const html = shallow(vDom).html();
    expect(html).to.equal('<div>bar2</div>');
  });

  it('test with clone and child', () => {
    class FakeComponent extends PureComponent {
      render() {
        const {comp, ...others} = this.props;
        return build(comp)(others, 'bar');
      }
    }
    const html = shallow(
      <FakeComponent id="foo" comp={<div>foo</div>} />,
    ).html();
    expect(html).to.equal('<div id="foo">bar</div>');
  });

  it('test with func and child', () => {
    const result = build(props => props)({foo: 'bar'}, 'hello child');
    expect(result.children).to.equal('hello child');
    expect(result.foo).to.equal('bar');
  });

  it('test with anonymous func and child', () => {
    const child = [<div id="1" key="0" />, <div id="2" key="1" />];
    const buildDom = build(({children}) => <div id="root">{children}</div>)(
      {},
      child,
    );
    const html = shallow(<div>{buildDom}</div>).html();
    const stateFunc = ({children}) => <div id="root">{children}</div>;
    const stateFuncBuildDom = build(stateFunc)({}, child);
    const stateFuncHtml = shallow(<div>{stateFuncBuildDom}</div>).html();
    const expected =
      '<div><div id="root"><div id="1"></div><div id="2"></div></div></div>';
    expect(html).to.equal(expected);
    expect(stateFuncHtml).to.equal(expected);
  });

  it('test with class and child', () => {
    class FakeComponent extends PureComponent {
      render() {
        return <div {...this.props} />;
      }
    }
    const vDom = build(FakeComponent)({id: 'foo'}, 'hello');
    const html = shallow(vDom).html();
    expect(html).to.equal('<div id="foo">hello</div>');
  });

  it('test with empty', () => {
    const result = build()();
    expect(result).to.be.null;
  });

  it('test with multi children', () => {
    const FakeDom = ({children}) => {
      return <div>{build(children)({title: 'foo'})}</div>;
    };
    const vDom = (
      <FakeDom>
        <div>1</div>
        <div>2</div>
      </FakeDom>
    );
    const wrap = shallow(vDom);
    expect(wrap.html()).to.equal(
      '<div><div title="foo">1</div><div title="foo">2</div></div>',
    );
  });

  it('test with multi function', () => {
    const FakeDom = ({children}) => {
      expect(Children.count(children)).to.equal(2);
      return (
        <div>
          {build(children)({foo: <div>{'foo'}</div>, bar: <div>{'bar'}</div>})}
        </div>
      );
    };
    const vDom = (
      <FakeDom>
        {({foo}) => foo}
        <div />
        <div />
        {({bar}) => bar}
      </FakeDom>
    );
    const wrap = shallow(vDom);
    expect(wrap.html()).to.equal(
      '<div><div>foo</div><div foo="[object Object]" bar="[object Object]"></div><div foo="[object Object]" bar="[object Object]"></div><div>bar</div></div>',
    );
  });

  it('test with multi Component instance', () => {
    const FakeDom = ({children}) => {
      expect(Children.count(children)).to.equal(2);
      return (
        <div>
          {build(children)({foo: <div>{'foo'}</div>, bar: <div>{'bar'}</div>})}
        </div>
      );
    };
    const A = ({foo}) => foo;
    const B = ({bar}) => bar;
    const vDom = (
      <FakeDom>
        {A}
        <div />
        <div />
        {B}
      </FakeDom>
    );
    const wrap = shallow(vDom);
    expect(wrap.html()).to.equal(
      '<div><div>foo</div><div foo="[object Object]" bar="[object Object]"></div><div foo="[object Object]" bar="[object Object]"></div><div>bar</div></div>',
    );
  });
});
