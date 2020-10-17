import React from "react";
import get from "get-object-value";
import { build } from "react-atomic-molecule";
import { connectHook } from "reshow-flux";

import { returnOptions } from "../molecules/ReshowComponent";

const { pathStates, ...otherDefaultProps } = returnOptions.defaultProps;

const myReturnOptions = {
  ...returnOptions,
  defaultProps: {
    ...otherDefaultProps,
    initStates: ["section", "I18N"],
  },
};

const Section = (props) => {
  const { section, immutable, children, ...otherProps } = props;
  if (!section) {
    return null;
  }
  const name = props.name;
  let allParams = myReturnOptions.reset(otherProps);
  if (immutable) {
    const thisSection = section.get(name);
    if (!thisSection) {
      return null;
    }
    const shouldRender = thisSection.get("shouldRender");
    if (!shouldRender) {
      return null;
    }
    thisSection
      .delete("shouldRender")
      .keySeq()
      .forEach((key) => {
        allParams[key] = thisSection.get(key);
      });
  } else {
    const { shouldRender, ...others } = get(section, [name], {});
    if (!shouldRender) {
      return null;
    }
    allParams = { ...others, ...allParams };
  }
  const noName = children.every
    ? children.every((child) => !get(child, ["props", "name"]))
    : !get(children, ["props", "name"]);
  if (!noName) {
    delete allParams["name"];
  }
  return build(children)(allParams);
};

Section.displayName = "Section";

export default connectHook(Section, myReturnOptions);
