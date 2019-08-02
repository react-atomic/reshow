'use strict';

import {Dispatcher} from '../index';
import {expect} from 'chai';

describe('Test Dispatcher', ()=>{ 
    let dispatcher = new Dispatcher();
    let result;
    it('could register', ()=>{
        dispatcher.register((action)=>{
           result = action; 
        }); 
        expect(dispatcher.cbs.length).to.equal(1);
        expect(result).to.equal(undefined);
    });
    it('could support hash dispatch', ()=>{
        dispatcher.dispatch({foo:'bar'}); 
        expect(result).to.deep.equal({foo:'bar'});
    });
    it('could support text dispatch', ()=>{
        dispatcher.dispatch('xxx'); 
        expect(result).to.deep.equal({type:'xxx'});
    });
});
