import usePrevious from "./usePrevious";
const useSyncChange = (value, setter) => {
  if (value !== usePrevious(value)) {
    setter(value);
  }
};
export default useSyncChange;
