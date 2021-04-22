import React, {PureComponent} from 'react';
import {expect} from 'chai';
import { mount, cleanIt } from "reshow-unit";

import {PopupPool} from 'organism-react-popup';

import ReshowMessage from '../ReshowMessage';
import {dispatch} from '../../../src/index';

describe('Test ReshowMessage', done => {
  afterEach(() => {
    cleanIt();
    dispatch("config/reset");
  });

  it('simple test', done => {
    const vDom = <ReshowMessage />;
    const wrap = mount(vDom);
    setTimeout(() => {
      expect(wrap.html()).to.have.string('div');
      done();
    });
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
    setTimeout(() => {
      wrap.update();
      expect(wrap.html()).to.have.string('dialog');
      done();
    }, 100);
  });
});
