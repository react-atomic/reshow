import {sessionStorage, Storage} from 'get-storage';

import {LocalStorageStore} from './localStorageStore';
import storageDispatcher from '../storageDispatcher';

class SessionStorageStore extends LocalStorageStore {
  getInitialState() {
    return new Storage(sessionStorage);
  }

  reduce(state, action) {
    switch (action.type) {
      case 'session':
        return this.updateStorage(state, action);
      default:
        return state;
    }
  }
}

export default new SessionStorageStore(storageDispatcher);
