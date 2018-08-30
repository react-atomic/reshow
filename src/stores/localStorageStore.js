import {ReduceStore} from 'reshow-flux'
import get from 'get-object-value'
import {localStorage} from 'get-storage'

import storageDispatcher from '../storageDispatcher'

const keys = Object.keys

const toInt = d => parseInt(d, 10)

class Storage
{
    constructor(_storage)
    {
        this._storage = _storage
    }

    set(k, v)
    {
        const _v = JSON.stringify(v)
        const vLen = _v.length
        const s = vLen+','+_v
        this._storage(k)(s)
    }

    get(k)
    {
        const s = this._storage(k)()
        if (!s) {return undefined}
        const iStar = s.indexOf(',')
        const vLen = toInt(s.substring(0,iStar))
        const value = s.substr(iStar+1) 
        if (vLen === value.length) {
            return JSON.parse(value)
        } else {
            return undefined 
        }
    }
}

class LocalStorageStore extends ReduceStore
{
    getInitialState()
    {
        return new Storage(localStorage)
    }

    updateStorage(state, action)
    {
        const params = get(action, ['params'])
        if (!params || 'object' !== typeof params) {
            return state
        }
        const pKeys = keys(params)
        if (!pKeys || !pKeys.length) {
            return state
        }
        pKeys.forEach(
            key => state.set(key, params[key])
        )
        // force udpate
        return this.getInitialState()
    }

    reduce (state, action)
    {
        switch(action.type) {
            case 'local':
                return this.updateStorage(state, action)
            default:
                return state
        }
    }
}

export default new LocalStorageStore(storageDispatcher)

export {
    LocalStorageStore,
    Storage
}
