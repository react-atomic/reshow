import usePrevious from "./usePrevious";
import callfunc from "call-func";

const useSyncChange = (value, setter, init, comparator = (a, b) => a !== b) => {
  if (comparator(value, usePrevious(value, init))) {
    callfunc(setter, [value]);
  }
};
export default useSyncChange;
