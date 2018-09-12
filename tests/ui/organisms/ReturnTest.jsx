import React, {PureComponent} from 'react';
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
        state = {}

        setNew(k, v)
        {
          this.setState({[k]:v})
        }
        
        render()
        {
            const {immutable} = this.props
            return (
            <Return immutable={immutable}>
                <TestEl ref={el=>this.el=el} {...this.state}/>
            </Return>
            );
        }
   }

   beforeEach(() => dispatch('config/reset'))

   it('assign props', ()=>{
       const vDom = <FakeComponent />;
       const uFake  = mount(vDom).instance();
       dispatch({data: {foo:'bar', I13N: {aaa: 'bbb'}}})
       expect(uFake.el.props.data).to.deep.equal({foo:'bar', I13N: {aaa: 'bbb'}})
       expect(uFake.el.props.I13N).to.deep.equal({aaa:'bbb'})
   })

   it('test Immutable path state', ()=>{
       const vDom = <FakeComponent immutable />;
       const uFake  = mount(vDom).instance();
       dispatch({
        data: {foo:'bar', I13N: {a: 'b'}}
       })
       const firstData = uFake.el.props.data
       const firstI13N = uFake.el.props.I13N
       uFake.setNew('bar', 'bbb')
       const secondData = uFake.el.props.data
       const secondI13N = uFake.el.props.I13N
       expect(firstData===secondData).to.be.true
       expect(firstI13N===secondI13N).to.be.true
       expect(firstData.toJS()).to.deep.equal({foo:'bar', I13N: {a: 'b'}})
       expect(firstI13N.toJS()).to.deep.equal({a: 'b'})
   })


})
