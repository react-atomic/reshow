import jsdom from 'jsdom-global';
import React, {PureComponent} from 'react';
import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

let uGlobal = jsdom(null, {url: 'http://localhost'});
import {AjaxPage} from 'organism-react-ajax';
import urlStore from '../stores/urlStore';

describe('Test Handle New Url', () => {
  after(() => {
    uGlobal();
    jsdom();
  });
  class FakeComponent extends PureComponent {
    render() {
      return (
        <AjaxPage
          ref={el => (this.page = el)}
          win={window}
          onUrlChange={this.props.onUrlChange}
          themes={{fake: <div />}}
          themePath="fake"
        />
      );
    }
  }

  it('test history back', done => {
    const myUpdate = () => {
      expect(true).to.be.true;
      done();
    };
    const vDom = <FakeComponent onUrlChange={myUpdate} />;
    const uFake = mount(vDom).instance();
    window.history.pushState(null, 'title', 'http://localhost/bbb');
    window.history.pushState(null, 'title', 'http://localhost/ccc');
    setTimeout(() => window.history.back());
  });
});
