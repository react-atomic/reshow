import Return, {initProps, ReshowComponent} from 'reshow-return';
import pageStore from '../../src/stores/pageStore';
import {globalStore} from '../../src/stores/globalStore';
const storeLocator = props => props.stores || [pageStore];
const globalStoreLocator = props => globalStore;

const myInitProps = {
  ...initProps,
  storeLocator,
  globalStoreLocator,
};

class MyReturn extends Return {
  static defaultProps = myInitProps;
}

class MyReshowComponent extends ReshowComponent {
  static defaultProps = myInitProps;
}

export {myInitProps as initProps, MyReturn as Return, MyReshowComponent as default};
