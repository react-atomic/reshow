import usePrevious from "./usePrevious";
import callfunc from "call-func";

const useSyncChange = (value, setter, init) => {
  if (value !== usePrevious(value, init)) {
    callfunc(setter, [value]);
  }
};
export default useSyncChange;
