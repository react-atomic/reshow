import { useEffect, useState } from "react";
import callfunc from "call-func";

const useLoaded = (onChange) => {
  const [isLoad, setIsLoad] = useState(() => callfunc(onChange, [false]) ?? false);
  useEffect(() => {
    setIsLoad(true);
    callfunc(onChange, [true]);
  }, []);
  return isLoad;
};

export default useLoaded;
