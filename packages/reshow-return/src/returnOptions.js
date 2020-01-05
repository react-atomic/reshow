import get from 'get-object-value';
import callfunc from 'call-func';

import toJS from './toJS';

const keys = Object.keys;
const isArray = Array.isArray;
const getImmutable = immutable => data => (!immutable ? toJS(data) : data);
const storeLocator = props => props.stores;
const globalStoreLocator = props => null;

const defaultProps = {
  initStates: ['data', 'I18N'],
  pathStates: {
    I13N: ['data', 'I13N'],
  },
  immutable: false,
  storeLocator,
  globalStoreLocator,
};

const getStores = props =>
  callfunc(props.storeLocator || storeLocator, [props]);

const calculateState = (prevState, props) => {
  /**
   * Why not support multi stores?
   * Because multi stores need handle complex data merge.
   * If that case need create custom calculateState functoin.
   */
  const thisStore = (getStores(props) || [])[0];
  if (!thisStore) {
    throw new Error('Store not found, Please check getStores function.');
  }
  const {
    initStates,
    pathStates,
    globalStoreLocator,
    immutable: propsImmutable,
  } = props;
  const storeState = thisStore.getState();
  const thisThemePath = storeState.get('themePath');
  const globalStore = callfunc(globalStoreLocator, [props]);
  if (thisThemePath && globalStore && globalStore.path !== thisThemePath) {
    return prevState;
  }
  const immutable = propsImmutable || storeState.get('immutable');
  const results = {};
  if (immutable) {
    results.immutable = immutable;
  }

  const toImmutable = getImmutable(immutable);

  if (isArray(initStates)) {
    initStates.forEach(key => {
      const data = storeState.get(key);
      results[key] = toImmutable(data);
    });
  } else if (initStates) {
    keys(initStates).forEach(key => {
      const data = storeState.get(key);
      const newKey = initStates[key] ? initStates[key] : key;
      results[newKey] = toImmutable(data);
    });
  }

  const getMapIn = (map, path) =>
    map && map.getIn ? map.getIn(path) : undefined;

  keys(pathStates || {}).forEach(key => {
    const thisPath = pathStates[key];
    results[key] = immutable
      ? getMapIn(get(results, [thisPath[0]]), thisPath.slice(1))
      : get(results, thisPath);
  });
  return results;
};

const options = {
  defaultProps,
  getStores,
  calculateState,
};

export default options;
