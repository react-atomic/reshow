import React, {
  isValidElement,
  cloneElement,
  createElement,
  Children,
} from "react";
import { STRING, FUNCTION, T_NULL, T_TRUE, TYPE_ERROR } from "reshow-constant";
import { removeEmpty } from "array.merge";

const buildFunc = (component, props, child, componentOption) => {
  // anonymous function will call directly
  const { wrap, doCallFunction } = componentOption || {};
  if ((FUNCTION === typeof component && !component.name) || doCallFunction) {
    try {
      if (child != T_NULL) {
        props.children = child;
      }
      const el = component(props);
      return wrap && !isValidElement(el) ? buildReact(wrap, props, el) : el;
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
  const params = [component, props];
  if (child != T_NULL) {
    params.push(child);
  }
  if (
    STRING === typeof component &&
    component !== component.replace(/[^a-z]/g, "")
  ) {
    return buildReact(<span>{component}</span>, props, child);
  } else {
    return (isValidElement(component) ? cloneElement : createElement).apply(
      T_NULL,
      params
    );
  }
};

const build = (component, componentOption) => (props, child) => {
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

  props = removeEmpty(props, T_TRUE);
  if (component.map) {
    delete props.key;
  }

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
