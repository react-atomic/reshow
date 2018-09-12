import {expect} from 'chai';
import {Map} from 'immutable';

import toJS from '../../cjs/src/toJS';

describe('Test toJS with object', () => {
  it('without set', () => {
    const foo = {foo: 'bar'};
    const foo1 = toJS(foo);
    const foo2 = toJS(foo);
    expect(foo1 === foo2).to.be.true;
  });

  it('set same value', () => {
    const foo = {foo: 'bar'};
    const foo1 = toJS(foo);
    foo.foo = 'bar';
    const foo2 = toJS(foo);
    expect(foo1 === foo2).to.be.true;
    expect(foo1).to.deep.equal({foo: 'bar'});
    expect(foo2).to.deep.equal({foo: 'bar'});
  });

  it('set different value', () => {
    const foo = {foo: 'bar'};
    const foo1 = toJS(foo);
    foo.foo = 'bar1';
    const foo2 = toJS(foo);
    expect(foo1 === foo2).to.be.true;
    expect(foo1).to.deep.equal({foo: 'bar1'});
    expect(foo2).to.deep.equal({foo: 'bar1'});
  });
});

describe('Test toJS with immuteable', () => {
  it('without set', () => {
    const foo = Map({foo: 'bar'});
    const foo1 = toJS(foo);
    const foo2 = toJS(foo);
    expect(foo1 === foo2).to.be.true;
  });

  it('set same value', () => {
    const foo = Map({foo: 'bar'});
    const foo1 = toJS(foo);
    const foo2 = toJS(foo.set('foo', 'bar'));
    expect(foo1 === foo2).to.be.true;
    expect(foo1).to.deep.equal({foo: 'bar'});
    expect(foo2).to.deep.equal({foo: 'bar'});
  });

  it('set different value', () => {
    const foo = Map({foo: 'bar'});
    const foo1 = toJS(foo);
    const foo2 = toJS(foo.set('foo', 'bar1'));
    expect(foo1 === foo2).to.be.false;
    expect(foo1).to.deep.equal({foo: 'bar'});
    expect(foo2).to.deep.equal({foo: 'bar1'});
  });
});
