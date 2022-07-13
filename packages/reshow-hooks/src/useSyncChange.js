import usePrevious from "./usePrevious";
const useSyncChange = (value, setter, init) => {
  if (value !== usePrevious(value, init)) {
    setter(value);
  }
};
export default useSyncChange;
