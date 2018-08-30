import React, {PureComponent} from 'react'

import {
    Return,
    localStorageStore,
    sessionStorageStore,
    storageDispatch
} from './../../../cjs/src/index'

import {expect} from 'chai'
import {shallow, mount, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('Test Storage Return', ()=>{ 
   class TestEl extends PureComponent 
   {
        show = 0
        render()
        {
            this.show++
            return <div />;
        }
   }

   class FakeComponent extends PureComponent 
   {
        render()
        {
            const {storage} = this.props
            return (
            <Return 
                stores={[storage]}
            >
                <TestEl ref={el=>this.el=el}/>
            </Return>
            );
        }
   }
   it('test get local storage', ()=>{
       const vDom = (
        <FakeComponent storage={localStorageStore} />
       )
       const uFake  = mount(vDom).instance();
       const uString = 'test123'
       storageDispatch('local', {data: uString});
       expect( uFake.el.props.data ).to.equal(uString)
   })

   it('test get session storage', ()=>{
       const vDom = (
        <FakeComponent storage={sessionStorageStore} />
       )
       const uFake  = mount(vDom).instance();
       const uString = 'test456'
       storageDispatch('session', {data: uString});
       expect( uFake.el.props.data ).to.equal(uString)
   })
})
