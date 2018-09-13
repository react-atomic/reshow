import {ReduceStore} from 'reshow-flux';
import {Map, List} from 'immutable';
import get from 'get-object-value'

import dispatcher from '../dispatcher';
import toJS from '../toJS'

let alertCount = 0
const isArray = Array.isArray

const toMessage = message => {
  if (-1 !== 'string|number'.indexOf(typeof message)) {
    message = {message}
  }
  if (!message.id) {
    message.id = 'm-'+alertCount 
    alertCount++
  }
  return message
}

const getMessage = action => {
  let message = get(action, ['params', 'message'])
  return toMessage(message)
}

class MessageStore extends ReduceStore {
  
  getInitialState()
  {
   return Map({
    alerts: List()
   }) 
  }

  dialogStart(state, action)
  {
    return state
  }

  dialogEnd(state, action)
  {
    return state
  }

  alertReset(state, action)
  {
    let alerts = get(action, ['params', 'alerts'])
    if (!isArray(alerts)) {
      alerts = List()
    } else {
      alerts = List(alerts.map(a => toMessage(a)))
    }
    return state.set('alerts', alerts)
  }

  alertDel(state, action)
  {
    const id = get(action, ['params', 'id'])
    const alerts = state.get('alerts').filter(
      item=>(item.id !== id) ? true : false
    )
    return state.set('alerts', alerts)
  }

  alertAdd(state, action)
  {
    const alerts = state.get('alerts')
    const message = getMessage(action)
    return state.set('alerts', alerts.push(message))
  }

  reduce(state, action) {
    switch (action.type) {
      case 'dialog/start':
        return this.dialogStart(state, action);
      case 'dialog/end':
        return this.dialogEnd(state, action);
      case 'alert/reset':
        return this.alertReset(state, action);
      case 'alert/del':
        return this.alertDel(state, action);
      case 'alert/add':
        return this.alertAdd(state, action);
      default:
        return state;
    }
  }
}

// Export a singleton instance of the store
export default new MessageStore(dispatcher);
