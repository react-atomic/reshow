import React, {PureComponent} from 'react';
import {Map} from 'immutable';
import {
    Section,
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
            <Section name="test" immutable={immutable}>
                <TestEl ref={el=>this.el=el}/>
            </Section>
            );
        }
   }

   beforeEach(() => dispatch('config/reset'))

   it('Section with immutable', () => {
       const vDom = <FakeComponent immutable={true}/>;
       const uFake  = mount(vDom).instance();
       dispatch({
        section: {
            test: {
                shouldRender: true,
                aaa: {bbb: 'ccc'}
            }
        },
        I18N: { ddd: 'fff'}
       })
       expect(Map.isMap(uFake.el.props.aaa)).to.be.true
       expect(Map.isMap(uFake.el.props.I18N)).to.be.true
   })

   it('Section without immutable', () => {
       const vDom = <FakeComponent />;
       const uFake  = mount(vDom).instance();
       dispatch({
        section: {
            test: {
                shouldRender: true,
                aaa: {bbb: 'ccc'}
            }
        },
        I18N: { ddd: 'fff'}
       })
       expect(Map.isMap(uFake.el.props.aaa)).to.be.false
       expect(Map.isMap(uFake.el.props.I18N)).to.be.false
   })
})
