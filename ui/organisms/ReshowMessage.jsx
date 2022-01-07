import React, { memo } from "react";
import { AlertsNotifier, Dialog, DisplayPopupEl } from "organism-react-popup";
import { build, SemanticUI } from "react-atomic-molecule";
import { toJS } from "reshow-return";

import { Return } from "../molecules/ReshowComponent";

// src
import messageStore from "../../src/stores/messageStore";
import { dispatch } from "../../src/index";

const handleDismiss = (e) => {
  const id = e?.data?.id;
  if (id) {
    dispatch("alert/del", {
      id,
    });
  }
};

const handleClick = (dialog) => (e, item) => {
  setTimeout(() => {
    if (dialog) {
      dispatch("dialog/end", {
        item,
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
            onClose: handleClick(dialog),
          },
          toJS(dialog)
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
