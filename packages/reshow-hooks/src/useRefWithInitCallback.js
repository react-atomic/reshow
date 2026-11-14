// @ts-check

import * as React from "react";
const { useRef, useState } = React;
import callfunc from "call-func";

/**
 * @template ValueType
 * @param {ValueType|(() => ValueType)} [value]
 * @return {React.MutableRefObject<ValueType|undefined>}
 */
const useRefWithInitCallback = (value) => {
  const last = /** @type {React.MutableRefObject<ValueType|undefined>} */ (
    useRef(null)
  );
  useState(() => {
    last.current = callfunc(value);
  });
  return last;
};

export default useRefWithInitCallback;
