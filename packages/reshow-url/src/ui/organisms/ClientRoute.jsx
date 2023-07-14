//@ts-check

import Reshow, { dispatch } from "reshow";
import { ajaxDispatch } from "organism-react-ajax";
import { doc } from "win-doc";

import handleAnchor from "../../handleAnchor";

/**
 * @param {string} url
 */
const defaultOnUrlChange =
  (url) =>
  /**
   * @param {function} handleAnchor
   */
  (handleAnchor) =>
  /**
   * @param {number} goAnchorDelay
   * @returns {Object}
   */
  (goAnchorDelay) => {
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

/**
 * @extends {Reshow}
 */
class ClientRoute extends Reshow {
  static defaultProps = {
    ajax: false,
    goAnchorDelay: 1500,
    fallback: "div",
    onHashChange: handleAnchor,
  };

  getPath() {
    const themePath = this.getUrlChangeState(
      this.props.url || doc().URL
    )?.themePath;
    const themes = this.props.themes;
    if (themes[themePath]) {
      setTimeout(() =>{
        dispatch({ themePath: themePath ?? this.getGlobalPath() })
      });
      return themePath;
    }
  }

  /**
   * @param {string} url
   * @returns {Object}
   */
  getUrlChangeState(url) {
    const { onUrlChange, onHashChange, goAnchorDelay } = this.props;
    const thisUrlChangeFunc = onUrlChange ? onUrlChange : defaultOnUrlChange;
    const nextState = thisUrlChangeFunc(url)(onHashChange)(goAnchorDelay);
    return nextState;
  }

  componentDidMount() {
    super.componentDidMount();

    ajaxDispatch({
      onUrlChange: this.getUrlChangeState.bind(this),
    });
  }
}

export default ClientRoute;
