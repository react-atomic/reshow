//@ts-check

import { useRef, useEffect } from "react";
import build from "reshow-build";
import { win } from "win-doc";

/**
 * @typedef {object} IntersectionObserverProps
 * @property {React.ReactElement|string} component
 * @property {IntersectionObserverCallback} onIntersect
 * @property {object} [options=null]
 */

/**
 * @param {IntersectionObserverProps} param
 */
const useIntersectionObserver = ({
  component,
  onIntersect,
  options = { threshold: [0, 1] },
}) => {
  const lastEl = useRef();
  const el = build(component)({ ref: lastEl });
  useEffect(() => {
    const dom = lastEl.current;
    if (!dom) {
      return;
    }
    const observer = new (win().IntersectionObserver)(onIntersect, options);
    observer.observe(dom);
    return () => {
      observer.unobserve(dom);
    };
  }, [lastEl.current]);
  return el;
};

export default useIntersectionObserver;
