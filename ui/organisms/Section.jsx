import React from "react";
import get from "get-object-value";
import { build } from "react-atomic-molecule";
import { useConnect } from "reshow-flux";

import { connectOptions } from "../molecules/ReshowComponent";

const { pathStates, ...otherOptions } = connectOptions;
otherOptions.initStates = ["section", "I18N"];

const Section = (props) => {
  const { immutable, children, ...otherProps } = props;
  const { section, ...state } = useConnect(otherOptions)(props);
  if (!section) {
    return null;
  }
  const name = props.name;
  let allParams = { ...connectOptions.reset(otherProps), ...state };
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

export default Section;
