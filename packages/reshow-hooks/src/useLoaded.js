import { useEffect, useReducer } from "react";
import callfunc from "call-func";
import { T_FALSE, T_TRUE } from "reshow-constant";

const useLoaded = (onChange) => {
  const [isLoad, setIsLoad] = useReducer(
    () => T_TRUE,
    T_FALSE,
    (bool) => callfunc(onChange, [bool]) ?? bool
  );
  useEffect(() => {
    setIsLoad();
    callfunc(onChange, [T_TRUE]);
  }, []);
  return isLoad;
};

export default useLoaded;
