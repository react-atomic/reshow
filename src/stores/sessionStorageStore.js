import {sessionStorage} from 'get-storage'

import storageDispatcher from '../storageDispatcher'
import {LocalStorageStore, Storage} from './localStorageStore'

class SessionStorageStore extends LocalStorageStore
{
    getInitialState()
    {
        return new Storage(sessionStorage)
    }

    reduce (state, action)
    {
        switch(action.type) {
            case 'session':
                return this.updateStorage(state, action)
            default:
                return state
        }
    }
}

export default new SessionStorageStore(storageDispatcher)
