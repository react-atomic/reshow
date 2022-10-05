import { PureComponent } from "react";
import Return from "reshow-return";
import { toJS } from "reshow-flux";
import { REAL_TIME_DATA_KEY, T_TRUE } from "reshow-constant";
import get from "get-object-value";
import callfunc from "call-func";
import { AjaxPage } from "organism-react-ajax";
import { doc, win } from "win-doc";
import { oneItemArrayToString } from "with-array";

import updateCanonicalUrl, { initCanonicalUrl } from "../../updateCanonicalUrl";
import dispatch from "../../dispatch";
import { globalStore } from "../../stores/globalStore";
import pageStore from "../../stores/pageStore";

let isInit;
let lastUrl;

const update = (params) => {
  const realTimeData = get(params, [REAL_TIME_DATA_KEY]);
  const reset = get(params, ["--reset--"]);
  const type = realTimeData
    ? "realTime"
    : "config/" + (reset ? "re" : "") + "set";
  dispatch(type, toJS(params));
  const oDoc = doc();
  if (oDoc.URL && lastUrl !== oDoc.URL) {
    lastUrl = oDoc.URL;
    const htmlTitle = get(params, ["htmlTitle"]);
    oDoc.title = oneItemArrayToString(htmlTitle) || "";
    const canonical = get(params, ["data", "canonical"]);
    if (canonical) {
      updateCanonicalUrl(canonical, params);
    }
  }
};

class Reshow extends PureComponent {
  static defaultProps = {
    fallback: null,
  };

  static getDerivedStateFromError(error) {
    return { hasError: T_TRUE };
  }

  getPath(stateThemePath) {
    return stateThemePath || this.props.themePath;
  }

  /**
   * @see globalStore https://github.com/react-atomic/reshow/blob/main/src/stores/globalStore.js
   */
  resetGlobalPath(path) {
    const { themes, defaultThemePath, themePath } = this.props;
    if (themes[path]) {
      globalStore.path = path;

      return globalStore.path;
    } else {
      /**
       * if not found themePath by custom value,
       *
       * should not backfill default theme to global store,
       * else will make global store become buggy.
       */
      return defaultThemePath || themePath;
    }
  }

  /**
   * @see globalStore https://github.com/react-atomic/reshow/blob/main/src/stores/globalStore.js
   */
  getGlobalPath() {
    return globalStore.path;
  }

  constructor(props) {
    if (null == isInit) {
      update(props);
      isInit = false;
    }
    super(props);
    this.state = { hasError: false };
    this.getPath = this.getPath.bind(this);
  }

  componentDidMount() {
    if (isInit) {
      console.warn("The best practice is avoid multi Reshow Component.");
      this.state = { hasError: T_TRUE };
    } else {
      isInit = true;
    }

    // Server site version also need update Canonical
    initCanonicalUrl(this.props);
    if (win().Reshow) {
      setTimeout(() => (win().Reshow.isLoad = T_TRUE));
    }
  }

  componentWillUnmount() {
    isInit = false;
  }

  componentDidCatch(error, info) {
    const { onError } = this.props;
    if (onError) {
      callfunc(onError, [error, info]);
    } else {
      console.error([error, info]);
    }
    this.setState({ hasError: T_TRUE });
  }

  /**
   * @returns {React.ReactElement}
   */
  render() {
    const { hasError } = this.state;
    const {
      baseUrl,
      staticVersion,
      themePath,
      themes,
      fallback,
      ajax,
      webSocketUrl,
    } = this.props;

    return (
      <Return
        store={pageStore}
        baseUrl={baseUrl}
        staticVersion={staticVersion}
        themePath={themePath}
        initStates={["baseUrl", "staticVersion", "webSocketUrl", "themePath"]}
      >
        {(data) => (
          <AjaxPage
            callback={update}
            /*State*/
            baseUrl={data.baseUrl}
            staticVersion={data.staticVersion}
            themePath={this.resetGlobalPath(this.getPath(data.themePath))}
            webSocketUrl={data.webSocketUrl}
            /*Props*/
            fallback={fallback}
            themes={themes}
            ajax={ajax}
          />
        )}
      </Return>
    );
  }
}

export default Reshow;
export { update };
