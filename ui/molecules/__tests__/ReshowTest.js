import React from 'react';
import Reshow from '../Reshow';
import {globalStore} from "../../../src/stores/globalStore";
import {dispatch} from '../../../src/dispatcher';

import {expect} from 'chai';
import {mount, cleanIt} from "reshow-unit";

describe('Test Reshow Component', ()=>{ 

  afterEach(() => {
    cleanIt();
    dispatch('config/reset');
    globalStore.path = null;
  });

  it('Reshow simple test', ()=>{
    const wrapper = mount(<Reshow themes={{hello: <div>Hello World!</div>}} themePath="hello" />);
    expect(wrapper.html()).to.equal('<div>Hello World!</div>');
  });
});
