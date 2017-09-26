'use strict';

import {Dispatcher} from '../../src/index';
import {expect} from 'chai';

describe('Test Dispatcher', ()=>{ 
    let dispatcher = new Dispatcher();
    let result;
    it('could register', ()=>{
        dispatcher.register((action)=>{
           result = action; 
        }); 
        expect(dispatcher.callbacks.length).to.equal(1);
        expect(result).to.equal(undefined);
    });
    it('could dispatch', ()=>{
        dispatcher.dispatch('xxx'); 
        expect(result).to.equal('xxx');
    });
});
