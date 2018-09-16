import {ReduceStore} from 'reshow-flux';
import {Map, List} from 'immutable';
import get from 'get-object-value';

import dispatcher, {dispatch} from '../dispatcher';

let alertCount = 0;
const isArray = Array.isArray;

const toMessage = message => {
  if (-1 !== 'string|number'.indexOf(typeof message)) {
    message = {message};
  }
  if (!message.id) {
    message.id = 'm-' + alertCount;
    alertCount++;
  }
  return message;
};

const getMessage = action => {
  let message = get(action, ['params', 'message']);
  return toMessage(message);
};

class MessageStore extends ReduceStore {
  getInitialState() {
    return Map({
      alerts: List(),
    });
  }

  dialogStart(state, action) {
    const params = get(action, ['params']);
    const {dialog, dialogProps, dialogTo} = params;
    const next = {dialog};
    if (dialogProps) {
      next.dialogProps = dialogProps;
    }
    if (dialogTo) {
      next.dialogTo = dialogTo;
    }
    return state.merge(next);
  }

  dialogEnd(state, action) {
    let dialogTo = state.get('dialogTo');
    if (!dialogTo) {
      dialogTo = 'dialogReturn';
    }
    const value = get(action, ['params', 'item', 'props', 'value']);
    dispatch({
      [dialogTo]: value,
    });
    return state.delete('dialog').delete('dialogProps');
  }

  alertReset(state, action) {
    let alerts = get(action, ['params', 'alerts']);
    if (!isArray(alerts)) {
      alerts = List();
    } else {
      alerts = List(alerts.map(a => toMessage(a)));
    }
    return state.set('alerts', alerts);
  }

  alertDel(state, action) {
    const id = get(action, ['params', 'id']);
    const alerts = state
      .get('alerts')
      .filter(item => (item.id !== id ? true : false));
    return state.set('alerts', alerts);
  }

  alertAdd(state, action) {
    const alerts = state.get('alerts');
    const message = getMessage(action);
    const alertProps = get(action, ['params', 'alertProps']);
    if (alertProps) {
      state = state.set('alertProps', alertProps);
    }
    return state.set('alerts', alerts.push(message));
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
