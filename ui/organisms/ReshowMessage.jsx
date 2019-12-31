import React, {PureComponent, memo} from 'react';
import {AlertsNotifier, Dialog, DisplayPopupEl} from 'organism-react-popup';
import {build, SemanticUI} from 'react-atomic-molecule';
import {toJS} from 'reshow-return';

import {Return} from '../molecules/ReshowComponent';

// src
import messageStore from '../../src/stores/messageStore';
import {dispatch} from '../../src/index';

class Body extends PureComponent {
  static defaultProps = {
    dialogComponent: Dialog,
    alertComponent: AlertsNotifier,
  };

  handleDismiss = item => {
    dispatch('alert/del', {
      id: item.id,
    });
  };

  handleClick = (e, item) => {
    setTimeout(() => {
      const {dialog} = this.props;
      if (dialog) {
        dispatch('dialog/end', {
          item,
        });
      }
    });
  };

  render() {
    const {
      defaultAlertProps,
      defaultDialogProps,
      alerts,
      alertProps,
      alertComponent,
      dialog,
      dialogProps,
      dialogComponent,
    } = this.props;
    let thisDialog = null;
    if (dialog) {
      thisDialog = (
        <DisplayPopupEl>
          {build(dialogComponent)(
            {
              ...defaultDialogProps,
              ...toJS(dialogProps),
              onClick: this.handleClick,
              onClose: this.handleClick,
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
          onDismiss: this.handleDismiss,
          alerts: toJS(alerts),
        })}
      </SemanticUI>
    );
  }
}

const ReshowMessage = memo(props => (
  <Return
    stores={[messageStore]}
    initStates={['alerts', 'alertProps', 'dialog', 'dialogProps']}>
    <Body {...props} />
  </Return>
));
ReshowMessage.displayName = 'ReshowMessage';

export default ReshowMessage;
