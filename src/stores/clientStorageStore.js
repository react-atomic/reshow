import { createReducer } from "reshow-flux-base";
import get from "get-object-value";
import { localStorage, sessionStorage, Storage } from "get-storage";
import { win } from "win-doc";

let isUpdating;
const lastDispatch = { current: {} };

const getLocalReducer = (name, storage, disableEncode) => {
  return createReducer((state, action) => {
    isUpdating = true;
    lastDispatch.current = {
      name,
      action,
    };
    const result = state.merge(action);
    isUpdating = false;
    return result;
  }, new Storage(storage, disableEncode));
};

const LOCAL_STORAGE = "localStorage";
const LOCAL_VALUE = "localValue";
const SESSION_STORAGE = "sessionStorage";
const SESSION_VALUE = "sessionValue";

const [localStorageStore, localStorageDispatch] = getLocalReducer(
  LOCAL_STORAGE,
  localStorage
);
const [localValueStore, localValueDispatch] = getLocalReducer(
  LOCAL_VALUE,
  localStorage,
  true
);
const [sessionStorageStore, sessionStorageDispatch] = getLocalReducer(
  SESSION_STORAGE,
  sessionStorage
);
const [sessionValueStore, sessionValueDispatch] = getLocalReducer(
  SESSION_VALUE,
  sessionStorage,
  true
);

export {
  localStorageStore,
  localStorageDispatch,
  localValueStore,
  localValueDispatch,
  sessionStorageStore,
  sessionStorageDispatch,
  sessionValueStore,
  sessionValueDispatch,
};
