export default useIntersectionObserver;
export type IntersectionObserverProps = {
    component: React.ReactElement | string;
    onIntersect: IntersectionObserverCallback;
    options?: object;
};
/**
 * @typedef {object} IntersectionObserverProps
 * @property {React.ReactElement|string} component
 * @property {IntersectionObserverCallback} onIntersect
 * @property {object} [options=null]
 */
/**
 * @param {IntersectionObserverProps} param
 */
declare function useIntersectionObserver({ component, onIntersect, options, }: IntersectionObserverProps): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
