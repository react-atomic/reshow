import React, {PureComponent} from 'react';
import {Map} from 'immutable';
import {
    Return,
    dispatch
} from './../../../cjs/src/index';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe('Test Return', ()=>{ 

   class TestEl extends PureComponent 
   {
        render()
        {
            return <div />;
        }
   }

   class FakeComponent extends PureComponent 
   {
        render()
        {
            const {immutable} = this.props
            return (
            <Return immutable={immutable}>
                <TestEl ref={el=>this.el=el}/>
            </Return>
            );
        }
   }

   beforeEach(() => dispatch('config/reset'))

   it('test immuteable', ()=>{
       const vDom = <FakeComponent immutable={true}/>;
       const uFake  = mount(vDom).instance();
       dispatch({data: {foo:'bar', I13N: {aaa: 'bbb'}}})
       expect(Map.isMap(uFake.el.props.data)).to.be.true;
       expect(Map.isMap(uFake.el.props.I13N)).to.be.true;
   })

   it('test immuteable with global config', ()=>{
       const vDom = <FakeComponent />;
       const uFake  = mount(vDom).instance();
       dispatch({
        data: {foo:'bar'},
        immutable: true
       })
       expect(Map.isMap(uFake.el.props.data)).to.be.true;
   })


   it('test not immuteable', ()=>{
       const vDom = <FakeComponent />;
       const uFake  = mount(vDom).instance();
       dispatch({data: {foo:'bar'}})
       expect(Map.isMap(uFake.el.props.data)).to.be.false;
   })
})
