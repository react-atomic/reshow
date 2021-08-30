import { useEffect, useRef } from "react";

const useMounted = () => {
  const _mount = useRef();
  useEffect(() => {
    _mount.current = true;
    return () => (_mount.current = false);
  }, []);
  return () => _mount.current;
};

export default useMounted;
