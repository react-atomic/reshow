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
      if (isValidElement(el)) {
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
  const isValidComp = isValidElement(component);
  if (isValidComp && !OBJ_SIZE(props) && null == child) {
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
      component !== /**@type string*/ (component).replace(/[^a-z0-9]/g, ""))
  ) {
    if (null != props.children) {
      throw new TypeError("String component should not have child");
    } else {
      return buildReact(<span>{/**@type string*/ (component)}</span>, props);
    }
  } else {
    return (isValidComp ? cloneElement : createElement).apply(T_NULL, params);
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
      if (FUNCTION !== typeof component && !isValidElement(component)) {
        child = component;
        component = altWrap;
      }
    }

    /**
     * @param {Component} comp
     */
    const run = (comp) => {
      props = removeEmpty(props, T_TRUE);
      return (isValidElement(comp) ? buildReact : buildFunc)(
        /**@type any*/ (comp),
        props,
        child,
        componentOption
      );
    };

    if (IS_ARRAY(component)) {
      const key = props.key;
      props.key = T_UNDEFINED;
      return (
        <Fragment key={key}>
          {Children.map(
            component.map((comp) => run(comp)),
            (c) => c
          )}
        </Fragment>
      );
    } else {
      return run(component);
    }
  };

export default build;
export { mergeRef } from "./mergeRef";
