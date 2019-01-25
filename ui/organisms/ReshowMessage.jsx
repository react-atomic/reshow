import React, {PureComponent, memo} from 'react';
import {AlertsNotifier, Dialog, DisplayPopupEl} from 'organism-react-popup';
import {SemanticUI} from 'react-atomic-molecule';

import Return from '../organisms/Return';

// src
import messageStore from '../../src/stores/messageStore';
import toJS from '../../src/toJS';
import {dispatch} from '../../src/index';

class Body extends PureComponent {
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
      alerts,
      alertProps,
      defaultAlertProps,
      dialog,
      dialogProps,
    } = this.props;
    let thisDialog = null;
    if (dialog) {
      thisDialog = (
        <DisplayPopupEl>
          <Dialog
            {...toJS(dialogProps)}
            onClick={this.handleClick}
            closeCallback={this.handleClick}>
            {toJS(dialog)}
          </Dialog>
        </DisplayPopupEl>
      );
    }
    return (
      <SemanticUI>
        {thisDialog}
        <AlertsNotifier
          {...defaultAlertProps}
          {...alertProps}
          onDismiss={this.handleDismiss}
          alerts={toJS(alerts)}
        />
      </SemanticUI>
    );
  }
}

const ReshowMessage = memo(props => {
  return (
    <Return
      stores={[messageStore]}
      initStates={['alerts', 'alertProps', 'dialog', 'dialogProps']}>
      <Body {...props} />
    </Return>
  );
});
ReshowMessage.displayName = 'ReshowMessage';

export default ReshowMessage;
