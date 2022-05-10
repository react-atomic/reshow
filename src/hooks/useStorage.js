import { useClientReturn } from "reshow-return";
import {
  localStorageStore,
  localStorageDispatch,
  localValueStore,
  localValueDispatch,
  sessionStorageStore,
  sessionStorageDispatch,
  sessionValueStore,
  sessionValueDispatch,
} from "../stores/clientStorageStore";

const getUseStorage = (store, dispatch) => (initStates) => {
  const state = useClientReturn(initStates, store);
  return [state, dispatch];
};

const useLocalStorage = getUseStorage(localStorageStore, localStorageDispatch);
const useLocalValue = getUseStorage(localValueStore, localValueDispatch);
const useSessionStorage = getUseStorage(
  sessionStorageStore,
  sessionStorageDispatch
);
const useSessionValue = getUseStorage(sessionValueStore, sessionValueDispatch);

export { useLocalStorage, useLocalValue, useSessionStorage, useSessionValue };
