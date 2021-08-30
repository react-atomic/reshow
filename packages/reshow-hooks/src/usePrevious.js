import { useEffect, useRef } from "react";

const usePrevious = (value) => {
  const prevValue = useRef();
  useEffect(() => {
    prevValue.current = value;
  }, [value]);
  return prevValue.current;
};

export default usePrevious;
