// @ts-check
import { useEffect } from "react";
import { T_FALSE, T_TRUE } from "reshow-constant";
import useEnable from "./useEnable";

/**
 * @param {function} [onChange]
 * @returns {boolean}
 */
const useLoaded = (onChange) => {
  const [isLoad, setIsLoad] = useEnable(T_TRUE, T_FALSE, onChange);
  useEffect(() => {
    setIsLoad();
  }, []);
  return isLoad;
};

export default useLoaded;
