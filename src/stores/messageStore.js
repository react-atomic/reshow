import { ReduceStore } from "reshow-flux";
import { Map, List } from "immutable";
import get from "get-object-value";
import callfunc from "call-func";
import { T_NULL, IS_ARRAY, KEYS } from "reshow-constant";

import dispatcher, { dispatch } from "../dispatcher";

let alertCount = 0;

const toMessage = (message) => {
  if (-1 !== "string|number".indexOf(typeof message)) {
    message = { message };
  }
  if (!message.id) {
    message.id = "m-" + alertCount;
    alertCount++;
  }
  return message;
};

const getMessage = (action) => toMessage(get(action, ["params", "message"]));

class MessageStore extends ReduceStore {
  dialogCallback = T_NULL;
  alertMap = {};

  getAlertList() {
    return KEYS(this.alertMap).map((key) => this.alertMap[key]);
  }

  dialogStart(state, action) {
    const params = get(action, ["params"]);
    const { dialog, dialogProps, dialogTo, callback } = params;
    const next = { dialog };
    if (dialogProps) {
      next.dialogProps = dialogProps;
    }
    if (dialogTo) {
      next.dialogTo = dialogTo;
    }
    if (callback) {
      this.dialogCallback = callback;
    }
    return state.merge(next);
  }

  dialogEnd(state, action) {
    let dialogTo = state.get("dialogTo");
    if (!dialogTo) {
      dialogTo = "dialogReturn";
    }
    const value = get(action, ["params", "item", "props", "value"]);
    if (value != T_NULL) {
      dispatch({
        [dialogTo]: value,
      });
    }
    callfunc(this.dialogCallback, [value]);
    this.dialogCallback = T_NULL;
    return state.delete("dialog").delete("dialogProps").delete("dialogTo");
  }

  alertReset(state, action) {
    let alerts = get(action, ["params", "alerts"]);
    this.alertMap = {};
    if (IS_ARRAY(alerts)) {
      alerts.map((a) => {
        const message = toMessage(a);
        this.alertMap[message.id] = message;
      });
    }
    return state.set("alerts", this.getAlertList());
  }

  alertDel(state, action) {
    const id = get(action, ["params", "id"]);
    delete this.alertMap[id];
    return state.set("alerts", this.getAlertList());
  }

  alertAdd(state, action) {
    const alerts = state.get("alerts");
    const message = getMessage(action);
    const alertProps = get(action, ["params", "alertProps"]);
    if (alertProps) {
      state = state.set("alertProps", alertProps);
    }
    this.alertMap[message.id] = message;
    return state.set("alerts", this.getAlertList());
  }

  reduce(state, action) {
    switch (action.type) {
      case "dialog/start":
        return this.dialogStart(state, action);
      case "dialog/end":
        return this.dialogEnd(state, action);
      case "alert/reset":
        return this.alertReset(state, action);
      case "alert/del":
        return this.alertDel(state, action);
      case "alert/add":
        return this.alertAdd(state, action);
      default:
        return state;
    }
  }
}

// Export a singleton instance of the store
export default new MessageStore(dispatcher);
