import { useEffect, useRef } from "react";
import { debounce } from "call-func";

const useDebounce = (func, defaultDelay) => {
  const _debounce = useRef();
  useEffect(() => {
    _debounce.current = debounce(func, defaultDelay);
  }, []);
  return _debounce.current;
};

export default useDebounce;
