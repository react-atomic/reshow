import {returnOptions, Return} from 'reshow-return';
import {connectHook} from 'reshow-flux';
import pageStore from '../../src/stores/pageStore';
import {globalStore} from '../../src/stores/globalStore';

const storeLocator = props => props.stores || [pageStore];
const globalStoreLocator = props => globalStore;

const myReturnOptions = {
  ...returnOptions,
  defaultProps: {
    ...returnOptions.defaultProps,
    storeLocator,
    globalStoreLocator
  }
}

const MyReturn = connectHook(Return, myReturnOptions);

export {myReturnOptions as returnOptions, MyReturn as Return};
