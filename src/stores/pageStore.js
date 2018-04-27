'use strict';

import {ReduceStore} from 'reshow-flux';
import dispatcher from '../dispatcher';

const keys = Object.keys;
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
            case 'realTime':
                return state;
            default:
                if (keys(action)) {
                    return state.merge(action);
                } else {
                    return state;
                }
        }
    }
}

// Export a singleton instance of the store
export default new PageStore(dispatcher);
