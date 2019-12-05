import React, {PureComponent} from 'react';
import get from 'get-object-value';
import {connect} from 'reshow-flux';
import {Map} from 'immutable';

import toJS from '../../src/toJS';
import {globalStore} from '../../src/stores/globalStore';
import pageStore from '../../src/stores/pageStore';

const keys = Object.keys;
const isArray = Array.isArray;

const getImmutable = immutable => data => (!immutable ? toJS(data) : data);

const initProps = {
  initStates: ['data', 'I18N'],
  pathStates: {
    I13N: ['data', 'I13N'],
  },
  immutable: false,
};

class ReshowComponent extends PureComponent {
  static defaultProps = initProps;

  static getStores(props) {
    return props.stores || [pageStore];
  }

  static calculateState(prevState, props) {
    /**
     * Why not support multi stores?
     * Because multi stores need handle complex data merge.
     * If that case need create custom calculateState functoin.
     */
    const thisStore = this.getStores(props)[0];
    const pageState = pageStore.getState();
    const storeState = thisStore.getState();
    const thisThemePath = pageState.get('themePath');
    if (thisThemePath && globalStore.path !== thisThemePath) {
      return prevState;
    }
    const {initStates, pathStates, immutable: propsImmutable} = props;
    const immutable = propsImmutable || pageState.get('immutable');
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

    const getMapIn = (map, path) => (map && map.getIn ? map.getIn(path) : undefined);

    keys(pathStates || {}).forEach(key => {
      const thisPath = pathStates[key];
      results[key] = immutable
        ? getMapIn(get(results, [thisPath[0]]), thisPath.slice(1))
        : get(results, thisPath);
    });
    return results;
  }
}

export default connect(
  ReshowComponent,
  {withProps: true},
);
export {initProps};
