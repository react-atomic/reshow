import { PureComponent } from "react";
import Return from "reshow-return";
import { toJS } from "reshow-flux";
import { REAL_TIME_DATA_KEY } from "reshow-constant";
import get from "get-object-value";
import { AjaxPage } from "organism-react-ajax";
import { doc } from "win-doc";
import callfunc from "call-func";
import { oneItemArrayToString } from "with-array";

import updateCanonicalUrl, {
  initCanonicalUrl,
} from "../../src/updateCanonicalUrl";
import dispatch from "../../src/dispatch";
import { globalStore } from "../../src/stores/globalStore";
import pageStore from "../../src/stores/pageStore";

let isInit;

const update = (params) => {
  const realTimeData = get(params, [REAL_TIME_DATA_KEY]);
  const reset = get(params, ["--reset--"]);
  const type = realTimeData
    ? "realTime"
    : "config/" + (reset ? "re" : "") + "set";
  dispatch(type, toJS(params));
  const oDoc = doc();
  if (oDoc.URL) {
    const htmlTitle = get(params, ["htmlTitle"]);
    if (htmlTitle) {
      oDoc.title = oneItemArrayToString(htmlTitle);
    }
    const canonical = get(params, ["data", "canonical"]);
    if (canonical) {
      updateCanonicalUrl(canonical, params);
    }
  }
};

class Reshow extends PureComponent {
  static defaultProps = {
    fallback: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  getPath(stateThemePath) {
    return stateThemePath || this.props.themePath;
  }

  /**
   * @see globalStore https://github.com/react-atomic/reshow/blob/main/src/stores/globalStore.js
   */
  resetGlobalPath(path) {
    const { themes, defaultThemePath, themePath } = this.props;
    if (!themes[path]) {
      path = defaultThemePath || themePath;
    }
    if (themes[path]) {
      globalStore.path = path;
    } else {
      return themePath;
    }
    return globalStore.path;
  }

  /**
   * @see globalStore https://github.com/react-atomic/reshow/blob/main/src/stores/globalStore.js
   */
  getGlobalPath() {
    return globalStore.path;
  }

  constructor(props) {
    super(props);
    if (isInit) {
      console.warn("The best practice is avoid multi Reshow Component.");
      this.state = { hasError: true };
    } else {
      update(props);
      this.state = { hasError: false };
      isInit = 1;
    }
    this.getPath = this.getPath.bind(this);
  }

  componentDidMount() {
    // Server site version also need update Canonical
    initCanonicalUrl(this.props);
  }

  componentDidCatch(error, info) {
    const { onError } = this.props;
    if (onError) {
      callfunc(onError, [error, info]);
    } else {
      console.error([error, info]);
    }
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { baseUrl, staticVersion, fallback, themes, ajax, webSocketUrl } =
      this.props;

    return (
      <Return
        store={pageStore}
        baseUrl={baseUrl}
        staticVersion={staticVersion}
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
