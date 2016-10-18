'use strict';

import Immutable from 'immutable';
import {ReduceStore} from 'reduce-flux';
import dispatchServer from '../actions/dispatcher';

class PageStore extends ReduceStore
{
    getInitialState()
    {
        return Immutable.Map();
    }

    updateUrl(url)
    {
        history.pushState('','',url);
    }

    reduce (state, action)
    {
        if (action.url) {
            this.updateUrl(action.url);
        }
        switch (action.type) {
            case 'config/set':
                return state.merge(action.params);
            default:
                return state;
        }
    }
}

// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
const instance = new PageStore(dispatchServer);
export default instance;
