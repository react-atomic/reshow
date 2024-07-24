import { memo } from "react";
import { AlertsNotifier, Dialog, DisplayPopupEl } from "organism-react-popup";
import { build, SemanticUI } from "react-atomic-molecule";
import { toJS } from "reshow-flux";
import get from "get-object-value";

// Local import
import { Return } from "../molecules/ReshowComponent";
import messageStore from "../../stores/messageStore";
import { dispatch } from "../../index";

const handleDismiss = (e) => {
  const id = e?.data?.id;
  if (id) {
    dispatch("alert/del", {
      id,
    });
  }
};

const handleClick = (dialog) => (e) => {
  const value = get(e, ["currentTarget", "value"]);
  setTimeout(() => {
    if (dialog) {
      dispatch("dialog/end", {
        value,
      });
    }
  });
};

const Body = (props) => {
  const {
    defaultAlertProps,
    defaultDialogProps,
    alerts,
    alertProps,
    alertComponent = AlertsNotifier,
    dialog,
    dialogProps,
    dialogComponent = Dialog,
  } = props;

  let thisDialog = null;
  if (dialog) {
    thisDialog = (
      <DisplayPopupEl>
        {build(dialogComponent)(
          {
            ...defaultDialogProps,
            ...toJS(dialogProps),
            onClick: handleClick(dialog),
            name: "reshow-dialog",
          },
          toJS(dialog),
        )}
      </DisplayPopupEl>
    );
  }
  return (
    <SemanticUI>
      {thisDialog}
      {build(alertComponent)({
        ...defaultAlertProps,
        ...toJS(alertProps),
        onDismiss: handleDismiss,
        alerts: toJS(alerts),
        name: "reshow-alerts",
      })}
    </SemanticUI>
  );
};

const ReshowMessage = memo((props) => (
  <Return
    store={messageStore}
    initStates={["alerts", "alertProps", "dialog", "dialogProps"]}
  >
    <Body {...props} />
  </Return>
));
ReshowMessage.displayName = "ReshowMessage";

export default ReshowMessage;
