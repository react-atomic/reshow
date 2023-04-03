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
 * @typedef Component
 * @type any
 */

/**
 * @typedef {object} BuildProps
 */

/**
 * @typedef {object} ComponentOption
 * @property {React.ReactElement} [wrap]
 * @property {boolean} [doCallFunction]
 */

/**
 * @param {function} component
 * @param {BuildProps} props
 * @param {Component} child
 * @param {ComponentOption} componentOption
 * @returns {React.ReactElement}
 */
const buildFunc = (component, props, child, componentOption) => {
  // anonymous function will call directly
  const { wrap, doCallFunction } = componentOption || {};
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
      return isValidElement(el)
        ? el
        : wrap
        ? buildReact(wrap, props, el)
        : buildReact(el, props);
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
 * @param {Component} child
 * @returns {React.ReactElement}
 */
const buildReact = (component, props = {}, child = T_UNDEFINED) => {
  if (!component) {
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
    STRING === typeof component &&
    component !== component.replace(/[^a-z]/g, "")
  ) {
    const { children, ...restProps } = props;
    return buildReact(<span>{component}</span>, restProps);
  } else {
    return (isValidComp ? cloneElement : createElement).apply(T_NULL, params);
  }
};

/**
 * @param {Component} component
 * @param {ComponentOption} componentOption
 */
const build =
  (component, componentOption = {}) =>
  /**
   * @param {BuildProps} props
   * @param {Component} child
   * @returns {React.ReactElement}
   */
  (props = {}, child = T_UNDEFINED) => {
    if (!component) {
      return T_NULL;
    }

    const { wrap } = componentOption || {};
    if (wrap) {
      if (FUNCTION !== typeof component && !isValidElement(component)) {
        child = component;
        component = wrap;
      }
    }

    /**
     * @param {Component} comp
     */
    const run = (comp) => {
      props = removeEmpty(props, T_TRUE);
      return (isValidElement(comp) ? buildReact : buildFunc)(
        comp,
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
