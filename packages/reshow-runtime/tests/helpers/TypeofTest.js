import typeIs from '../../helpers/getTypeOf';
import helperTypeof from '../../helpers/typeof';
import {expect} from 'chai';

describe('Test typeof', () => {
  class FOO {}
  class t {}
  it('test typeIs', () => {
    expect(typeIs(Symbol())).to.equal('symbol');
    expect(typeIs({})).to.equal('object');
    expect(typeIs(() => {})).to.equal('function');
    expect(typeIs(new FOO())).to.equal('foo');
  });
  it('test helper typeof', () => {
    const symbol1 = Symbol();
    const symbolTypeOf = helperTypeof(symbol1);
    const objectTypeOf = helperTypeof({});
    expect(symbolTypeOf).to.equal('symbol');
    expect(objectTypeOf).to.equal('object');
    expect(helperTypeof(new FOO())).to.equal('object');
    expect(helperTypeof(new t())).to.equal('object');
    expect(helperTypeof(1)).to.equal('number');
    expect(helperTypeof('1')).to.equal('string');
    expect(helperTypeof(true)).to.equal('boolean');
    expect(helperTypeof(() => {})).to.equal('function');
    expect(helperTypeof(undefined)).to.equal('undefined');
  });
  it('test typeof array', () => {
    expect(helperTypeof([])).to.equal('object');
    expect(typeIs([])).to.equal('array');
  });
});
