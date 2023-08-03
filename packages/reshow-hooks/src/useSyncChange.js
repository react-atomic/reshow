import callfunc from "call-func";

import usePrevious from "./usePrevious";

const useSyncChange = (value, setter, init, comparator = (a, b) => a !== b) => {
  if (comparator(value, usePrevious(value, init))) {
    callfunc(setter, [value]);
  }
};
export default useSyncChange;
