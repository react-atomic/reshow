import { useReturn } from "reshow-return";
import sStore, { sessionStorageDispatch } from "./stores/sessionStorageStore";

const useSessionStorage = (initStates) => {
  const state = useReturn(initStates, sStore);
  return [state, sessionStorageDispatch];
};

export default useSessionStorage;
