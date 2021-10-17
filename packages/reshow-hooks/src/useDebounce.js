import { useEffect, useRef } from "react";
import { debounce } from "call-func";

const useDebounce = (func, defaultDelay, scope) => {
  const _debounce = useRef();
  useEffect(() => {
    _debounce.current = debounce(func, defaultDelay);
  }, []);
  return (...args) => _debounce.current({ scope, args });
};

export default useDebounce;
