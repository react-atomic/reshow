import { useReducer } from "react";
import callfunc from "call-func";
const useEnable = (setTo, initVal, onChange) => {
  const reducer = useReducer(
    () => callfunc(onChange, [setTo]) || setTo,
    initVal,
    (val) => callfunc(onChange, [val]) ?? val
  );
  return reducer;
};
export default useEnable;
