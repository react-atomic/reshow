import jsdom from "jsdom-global";

import React, { PureComponent } from "react";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ClientRoute from "../ClientRoute";


configure({ adapter: new Adapter() });

describe("Test ClientRoute", () => {
  let reset;

  beforeEach(() => {
    reset = jsdom(null, { url: "http://localhost" });
  });

  afterEach(() => {
    reset();
  });
  it("basic test", ()=>{
    const vDom = ( 
      <ClientRoute 
      themePath="foo"
      themes={{foo: "div"}}
      />
    );
    const wrap = mount(vDom);
    const actual = wrap.html();
    expect(actual).to.have.string('div')
  });
});
