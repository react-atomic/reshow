import React from 'react';
import Reshow from '../Reshow';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Test Reshow Component', ()=>{ 
  it('Reshow simple test', ()=>{
    const wrapper = mount(<Reshow themes={{hello: <div>Hello World!</div>}} themePath="hello" />);
    expect(wrapper.html()).to.equal('<div>Hello World!</div>');
  });
});
