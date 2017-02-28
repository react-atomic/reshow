'use strict';

import {ReduceStore} from 'reduce-flux';
import dispatcher from '../actions/dispatcher';

class RealTimeStore extends ReduceStore
{
    getInitialState()
    {
        return [];
    }

    reduce (state, action)
    {
        switch (action.type) {
            case 'realTime':
                return action.params;
            default:
                return []; 
        }
    }
}

const instance = new RealTimeStore(dispatcher);
export default instance;
