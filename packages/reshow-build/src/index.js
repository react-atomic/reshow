// @ts-check
import {
  OBJ_SIZE,
  STRING,
  FUNCTION,
  T_NULL,
  T_TRUE,
  TYPE_ERROR,
  T_UNDEFINED,
  IS_ARRAY,
} from "reshow-constant";
import { removeEmpty } from "array.merge";
import * as React from "react";
const { isValidElement, cloneElement, createElement, Children, Fragment } =
  React;

/**
 * React 19 / RSC compatibility: an element shipped across the server/client
 * boundary may not satisfy `isValidElement` (different `$$typeof` symbol
 * resolution between React instances), yet it is structurally a React element.
 * Treat any object carrying `$$typeof` and `type` as element-like so we never
 * pass it as the *type* argument to `createElement`.
 *
 * @param {any} x
 * @returns {boolean}
 */
const isElementLike = (x) =>
  isValidElement(x) ||
  ("object" === typeof x && null !== x && null != x.$$typeof && "type" in x);

/**
 * @typedef {React.ComponentType|React.ReactNode|Function} Component
 */

/**
 * @typedef {import('./mergeRef').RefType} RefType
 */

/**
 * @typedef {object} BuildProps
 */

/**
 * @typedef {object} ComponentOption
 * @property {Component} [altWrap] This will only be used when the original component is not a valid element.
 * @property {boolean} [doCallFunction]
 */

/**
 * @param {function} component
 * @param {BuildProps} props
 * @param {Component|Component[]} child
 * @param {ComponentOption} componentOption
 * @returns {React.ReactElement?}
 */
const buildFunc = (component, props, child, componentOption) => {
  // anonymous function will call directly
  const { altWrap, doCallFunction } = componentOption || {};
  if (
    (FUNCTION === typeof component &&
      (!component.name || "children" === component.name)) ||
    doCallFunction
  ) {
    try {
      if (child != T_NULL) {
        props.children = /** @type React.ReactElement*/ (child);
      }
      const el = component(props);
      if (isElementLike(el)) {
        const elKey = el.key || props.key;
        return null != elKey ? buildReact(el, { key: elKey }) : el;
      } else {
        return altWrap ? buildReact(altWrap, props, el) : buildReact(el, props);
      }
    } catch (e) {
      if (e.name === TYPE_ERROR) {
        return buildReact(component, props, child);
      } else {
        throw e;
      }
    }
  } else {
    return buildReact(component, props, child);
  }
};

/**
 * @param {Component} component
 * @param {BuildProps} props
 * @param {Component|Component[]} child
 * @returns {React.ReactElement?}
 */
const buildReact = (component, props = {}, child = T_UNDEFINED) => {
  if (T_NULL == component) {
    return T_NULL;
  }
  const isElement = isElementLike(component);
  if (isElement && !OBJ_SIZE(props) && null == child) {
    return component;
  }
  const params = [component, props];
  if (child != T_NULL) {
    params.push(child);
  }
  if (
    !component ||
    T_TRUE === component ||
    (STRING === typeof component &&
      component !== /**@type string*/ (component).replace(/[^a-z1-6]/g, ""))
  ) {
    if (null != props.children) {
      throw new TypeError("String component should not have child");
    } else {
      return buildReact(<span>{/**@type string*/ (component)}</span>, props);
    }
  } else {
    return (isElement ? cloneElement : createElement).apply(T_NULL, params);
  }
};

/**
 * @param {Component|Component[]} [component]
 * @param {ComponentOption} componentOption
 */
const build =
  (component, componentOption = {}) =>
  /**
   * @param {BuildProps} props
   * @param {Component|Component[]} child
   * @returns {React.ReactElement?}
   */
  (props = {}, child = T_UNDEFINED) => {
    if (T_NULL == component) {
      return T_NULL;
    }

    const { altWrap } = componentOption || {};
    if (altWrap) {
      if (FUNCTION !== typeof component && !isElementLike(component)) {
        child = component;
        component = altWrap;
      }
    }

    /**
     * @param {Component} comp
     */
    const run = (comp) => {
      props = removeEmpty(props, T_TRUE);
      return (isElementLike(comp) ? buildReact : buildFunc)(
        /**@type any*/ (comp),
        props,
        child,
        componentOption,
      );
    };

    if (IS_ARRAY(component)) {
      const key = props.key;
      props.key = T_UNDEFINED;
      return (
        <Fragment key={key}>
          {Children.map(
            component.map((comp) => run(comp)),
            (c) => c,
          )}
        </Fragment>
      );
    } else {
      return run(component);
    }
  };

export default build;
export { isElementLike };
export { mergeRef } from "./mergeRef";
