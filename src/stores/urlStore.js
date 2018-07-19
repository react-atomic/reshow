import {ReduceStore} from 'reshow-flux'
import urlDispatcher, {urlDispatch} from '../urlDispatcher';
import get from 'get-object-value'
import setUrl, {getUrl} from 'seturl';

const keys = Object.keys

const updateUrl = url => history.pushState('','',url)

class URL 
{
    loc = {}
    constructor(loc)
    {
        this.loc = {...loc}
    }

    getHref(loc)
    {
        return this.loc.href
    }

    get(key)
    {
        if (0 === key.indexOf(':')) {
            const cookKey = key.substr(1)
            const value = get(this.loc, [key.substr(1)])
            if ('pathname' === cookKey) {
                return value.split('/')
            } else {
                return value
            }
        } else {
            return getUrl(key, this.getHref())
        }
    }
}

class UrlStore extends ReduceStore
{
    getInitialState()
    {
        let loc = {}
        if ('undefined' !== typeof document) {
            const doc = document
            loc = doc.location
            this.registerEvent(window)
        }
        return new URL(loc)
    }

    registerEvent(win)
    {
        window.addEventListener("popstate", () => {
            const doc = document
            urlDispatch({type: 'url', url: doc.URL}) 
        }, true);
    }

    reduce (state, action)
    {
        if ('undefined' === typeof document) {
            return state 
        }
        const doc = document
        let url;
        switch(action.type) {
            case 'url':
                url = get(action, ['url'])
                if (!url) {
                    console.error('Not assign url', action)
                }
                break
            case 'query':
                url = doc.URL
                keys(get(action.params, null, [])).forEach( key => {
                    url = setUrl(key, get(action, ['params', key]), url)            
                })
                break
        }
        if (url !== doc.URL) {
            updateUrl(url)
            const loc = doc.location
            return new URL(loc)
        } else {
            if (url !== state.getHref()) {
                const loc = doc.location
                return new URL(loc)
            }
            return state
        }
    }
}

export default new UrlStore(urlDispatcher)
