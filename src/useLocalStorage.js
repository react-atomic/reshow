import { useReturn } from "reshow-return";
import lStore, { localStorageDispatch } from "./stores/localStorageStore";

const useLocalStorage = (initStates) => {
  const state = useReturn(initStates, lStore);
  return [state, localStorageDispatch];
};

export default useLocalStorage;
