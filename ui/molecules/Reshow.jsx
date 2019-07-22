import React, {PureComponent} from 'react';
import get from 'get-object-value';
import {AjaxPage} from 'organism-react-ajax';
import {connect} from 'reshow-flux';
import {localStorage as lStore} from 'get-storage';
import {doc} from 'win-doc'; 

import {dispatch, global, pageStore} from '../../src/index';

const isArray = Array.isArray;

let isInit;

const updateCanonicalUrl = (url, props) => {
  if (get(props, ['disableCanonical'], () => lStore('disableCanonical')())) {
    return;
  }
  const loc = doc().location;
  const newUrl = url + loc.search + loc.hash;
  if (-1 !== url.indexOf(loc.hostname)) {
    history.replaceState('', '', newUrl);
  } else {
    loc.replace(newUrl);
  }
};

const update = params => {
  const realTimeData = get(params, ['--realTimeData--']);
  const reset = get(params, ['--reset--']);
  let type;
  if (realTimeData) {
    type = 'realTime';
  } else {
    type = 'config/' + (reset ? 're' : '') + 'set';
  }
  dispatch({type, params});
  const oDoc = doc();
  if (oDoc) {
    const htmlTitle = get(params, ['htmlTitle']);
    if (htmlTitle) {
      if (isArray(htmlTitle)) {
        oDoc.title = get(htmlTitle, [0]);
      } else {
        oDoc.title = htmlTitle;
      }
    }
    const canonical = get(params, ['data', 'canonical']);
    if (canonical) {
      updateCanonicalUrl(canonical, params);
    }
  }
};

class Reshow extends PureComponent {
  static getStores() {
    return [pageStore];
  }

  static calculateState(prevState) {
    const pageState = pageStore.getState();
    global.path = pageStore.getThemePath();
    return {
      themePath: global.path,
      baseUrl: pageState.get('baseUrl'),
      staticVersion: pageState.get('staticVersion'),
    };
  }

  constructor(props) {
    super(props);
    if (isInit) {
      console.warn('The best practice is avoid multi Reshow Component.');
      this.stop = true;
    } else {
      update(props);
      this.stop = false;
      isInit = 1;
    }
  }

  componentDidMount() {
    const canonical = doc().querySelector('link[rel="canonical"]');
    if (-1 !== doc().URL.indexOf('--disableCanonical')) {
      lStore('disableCanonical')(1);
    } else if (canonical && canonical.href) {
      updateCanonicalUrl(canonical.href, this.props);
    }
  }

  render() {
    if (this.stop) {
      return null;
    }
    const {themes, defaultThemePath, ajax, webSocketUrl} = this.props;
    const {themePath, baseUrl, staticVersion} = this.state;

    return (
      <AjaxPage
        callback={update}
        /*State*/
        themePath={themePath || defaultThemePath}
        baseUrl={baseUrl}
        /* Keep staticVersion, let user can't assign emtpy value. */
        staticVersion={staticVersion}
        /*Props*/
        themes={themes}
        ajax={ajax}
        webSocketUrl={webSocketUrl}
      />
    );
  }
}

export default connect(Reshow);
export {update};
