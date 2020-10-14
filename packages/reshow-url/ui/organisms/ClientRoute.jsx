import Reshow from "reshow";
import { ajaxDispatch } from "organism-react-ajax";
import { doc } from "win-doc";

import handleAnchor from "../../src/handleAnchor";
import urlStore from "../../src/stores/urlStore";

const defaultOnUrlChange = (url) => (handleAnchor) => (goAnchorDelay) => {
  const separator = "/";
  const params = url.split(separator);
  const last = params.length - 1;
  const lastPath = params[last];
  const next = {
    pvid: url,
    themePath: null,
  };
  if (lastPath) {
    next.themePath = handleAnchor(lastPath)(goAnchorDelay);
  }
  return next;
};

class ClientRoute extends Reshow {
  static defaultProps = {
    ajax: false,
    goAnchorDelay: 1500,
  };

  getPath() {
    const nextThemePath = this.getGlobalPath()
      ? this.resetGlobalPath()
      : this.getUrlChangeState(this.props.url || doc().URL)?.themePath ||
        this.resetGlobalPath();
    this.resetGlobalPath(nextThemePath);
    return nextThemePath;
  }

  getUrlChangeState(url) {
    const { onUrlChange, goAnchorDelay } = this.props;
    const thisUrlChangeFunc = onUrlChange ? onUrlChange : defaultOnUrlChange;
    return thisUrlChangeFunc(url)(handleAnchor)(goAnchorDelay);
  }

  componentDidMount() {
    super.componentDidMount();

    ajaxDispatch("config/set", {
      onUrlChange: this.getUrlChangeState.bind(this),
    });
  }
}

export default ClientRoute;
