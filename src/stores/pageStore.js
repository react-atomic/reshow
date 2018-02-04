'use strict';

import {ReduceStore} from 'reshow-flux';
import dispatcher from '../dispatcher';

const updateUrl = url => history.pushState('','',url);

class PageStore extends ReduceStore
{
    reduce (state, action)
    {
        if (action.url) {
            updateUrl(action.url);
        }
        switch (action.type) {
            case 'config/set':
                return state.merge(action.params);
            case 'config/reset':
                return state.clear().merge(action.params);
            default:
                return state;
        }
    }
}

// Export a singleton instance of the store
export default new PageStore(dispatcher);
