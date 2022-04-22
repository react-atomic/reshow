import { useEffect, useState } from "react";
import callfunc from "call-func";

const useLoaded = (onChange) => {
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    setIsLoad(true);
    callfunc(onChange, [true]);
  }, []);
  callfunc(onChange, [false]);
  return isLoad;
};

export default useLoaded;
