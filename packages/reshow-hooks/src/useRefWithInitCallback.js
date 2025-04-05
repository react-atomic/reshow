// @ts-check

import * as React from "react";
const { useRef, useState } = React;
import callfunc from "call-func";

/**
 * @template ValueType
 * @param {ValueType|function():ValueType} [value]
 * @return {React.Ref<ValueType|undefined>}
 */
const useRefWithInitCallback = (value) => {
  /**
   * @type {React.Ref<ValueType|undefined>}
   */
  const last = useRef(null);
  useState(() => {
    last.current = callfunc(value);
  });
  return last;
};

export default useRefWithInitCallback;
