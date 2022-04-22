import { useClientReturn } from "reshow-return";
import lStore, { localStorageDispatch } from "../stores/localStorageStore";

const useLocalStorage = (initStates) => {
  const state = useClientReturn(initStates, lStore);
  return [state, localStorageDispatch];
};

export default useLocalStorage;
