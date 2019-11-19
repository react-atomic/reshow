import React, {PureComponent} from 'react';
import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import {PopupPool} from 'organism-react-popup';

import ReshowMessage from '../ReshowMessage';
import {dispatch} from '../../../src/index';

describe('Test ReshowMessage', () => {
  it('simple test', () => {
    const vDom = <ReshowMessage />;
    const wrap = shallow(vDom);
    expect(wrap.html()).to.have.string('div');
  });

  it('test', done => {
    const vDom = (
      <div>
        <ReshowMessage />
        <PopupPool />
      </div>
    );
    const wrap = mount(vDom);
    dispatch('dialog/start', {
      dialog: 'how are u',
    });
    setTimeout(()=>{
      expect(wrap.html()).to.have.string('dialog');
      done();
    }, 100);
  });
});
