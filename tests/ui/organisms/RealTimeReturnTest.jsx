import React, {PureComponent} from 'react';
import {
    RealTimeReturn,
    dispatch
} from './../../../cjs/src/index';

import {expect} from 'chai';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Test RealTimeReturn', ()=>{ 

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
                const {realTimeReset} = this.props
                return (
                <RealTimeReturn realTimeReset={realTimeReset} realTimePath={['r']}>
                    <TestEl ref={el=>this.el=el}/>
                </RealTimeReturn>
                );
            }
       }
    it('dispatch pageStore first', ()=>{
       const vDom = <FakeComponent />;
       const uFake  = mount(vDom).instance();
       dispatch({data:'foo'});
       expect(uFake.el.props.data).to.equal('foo');
       dispatch({type: 'realTime', params: {r: {data: 'bar'}}});
       expect(uFake.el.props.data).to.equal('bar');
    });

    it('dispatch realtime first', ()=>{
       const vDom = <FakeComponent />;
       const uFake  = mount(vDom).instance();
       dispatch({type: 'realTime', params: {r: {data: 'bar'}}});
       expect(uFake.el.props.data).to.equal('bar');
       dispatch({data:'foo'});
       expect(uFake.el.props.data).to.equal('bar');
    });

    it('test realtime reset', ()=>{
       const vDom = <FakeComponent realTimeReset={true} />;
       const uFake  = mount(vDom).instance();
       dispatch({type: 'realTime', params: {r: {data: 'bar'}}});
       expect(uFake.el.props.data).to.equal('bar');
       dispatch({data:'foo'});
       expect(uFake.el.props.data).to.be.null;
    });
 
});
