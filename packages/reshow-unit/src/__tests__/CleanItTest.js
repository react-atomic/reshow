import React from "react";
import { expect } from "chai";

import { mount, cleanIt, jsdom } from "../index";

describe("Test Reshow Component", () => {
  let resetGlobal;
  beforeEach(() => {
    jsdom();
  });
  afterEach(() => {
    cleanIt();
  });

  it("basic test", () => {
    const DIV = () => <div />;
    const wrapper = mount(<DIV />);
    expect(wrapper.html()).to.equal('<div></div>');
    cleanIt();
    expect(()=>wrapper.html()).to.throw();
  });

  it('test attach', ()=>{
    const el = document.createElement('div');
    document.body.appendChild(el);
    const SPAN = () => <span />;
    const wrapper = mount(<SPAN />, {attachTo: el});
    expect(document.body.innerHTML).to.equal('<div><span></span></div>');
    cleanIt({withoutJsdom: true});
    expect(document.body.innerHTML).to.equal('<div></div>');
    cleanIt();
    expect(document.body.innerHTML).to.equal('');
  });
});
