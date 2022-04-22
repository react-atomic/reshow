import { useClientReturn } from "reshow-return";
import sStore, { sessionStorageDispatch } from "../stores/sessionStorageStore";

const useSessionStorage = (initStates) => {
  const state = useClientReturn(initStates, sStore);
  return [state, sessionStorageDispatch];
};

export default useSessionStorage;
