import {ReduceStore} from 'reshow-flux';
import dispatcher from '../dispatcher';

class MessageStore extends ReduceStore {
  

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
    return state
  }

  alertClean(state, action)
  {
    return state
  }

  alertAdd(state, action)
  {
    return state
  }

  reduce(state, action) {
    switch (action.type) {
      case 'dialog/start':
        return this.dialogStart(state, action);
      case 'dialog/end':
        return this.dialogEnd(state, action);
      case 'alert/reset':
        return this.alertReset(state, action);
      case 'alert/clean':
        return this.alertClean(state, action);
      case 'alert/add':
        return this.alertAdd(state, action);
      default:
        return state;
    }
  }
}

// Export a singleton instance of the store
export default new MessageStore(dispatcher);
