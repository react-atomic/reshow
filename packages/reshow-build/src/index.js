import { isValidElement, cloneElement, createElement, Children } from "react";
import {
  OBJ_SIZE,
  STRING,
  FUNCTION,
  T_NULL,
  T_TRUE,
  TYPE_ERROR,
  T_UNDEFINED,
} from "reshow-constant";
import { removeEmpty } from "array.merge";

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
        props.children = child;
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

const buildReact = (component, props, child) => {
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

const build =
  (component, componentOption) =>
  (props = {}, child) => {
    if (!component) {
      return T_NULL;
    }

    const { wrap, doCallFunction } = componentOption || {};
    if (wrap) {
      if (FUNCTION !== typeof component && !isValidElement(component)) {
        child = component;
        component = wrap;
      }
    }

    if (component.map) {
      // need locate before removeEmpty
      props.key = T_UNDEFINED;
    }
    props = removeEmpty(props, T_TRUE);

    const run = (comp) =>
      (isValidElement(comp) ? buildReact : buildFunc)(
        comp,
        props,
        child,
        componentOption
      );

    return component.map
      ? Children.map(
          component.map((comp) => run(comp)),
          (c) => c
        )
      : run(component);
  };

export default build;
