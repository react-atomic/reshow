import { refineAction } from "reshow-flux-base";

import { realTimeDispatch } from "./stores/realTimeStore";
import { messageDispatch } from "./stores/messageStore";
import { localStorageDispatch } from "./stores/localStorageStore";
import { sessionStorageDispatch } from "./stores/sessionStorageStore";
import { pageDispatch } from "./stores/pageStore";

const dispatch = (...action) => {
  action = refineAction(...action);
  switch (action.type) {
    case "dialog/start":
    case "dialog/end":
    case "alert/reset":
    case "alert/del":
    case "alert/add":
      messageDispatch(action);
      break;
    case "realTime":
      realTimeDispatch(action);
      break;
    case "local":
      localStorageDispatch(action);
      break;
    case "session":
      sessionStorageDispatch(action);
      break;
    default:
      pageDispatch(action);
      break;
  }
};

export default dispatch;
