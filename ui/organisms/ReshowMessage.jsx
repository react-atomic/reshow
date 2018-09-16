import React, {PureComponent} from 'react';
import {AlertsNotifier, Dialog, DisplayPopupEl} from 'organism-react-popup';
import {SemanticUI} from 'react-atomic-molecule';

import Return from '../organisms/Return';
import messageStore from '../../src/stores/messageStore';
import {dispatch} from '../../src/index';

class Body extends PureComponent {
  handleDismiss = item => {
    dispatch('alert/del', {
      id: item.id,
    });
  };

  handleClick = (e, item) => {
    setTimeout(()=>{
      const {dialog} = this.props;
      if (dialog) {
        dispatch('dialog/end', {
          item,
        });
      }
    })
  };

  render() {
    const {alerts, dialog, dialogProps} = this.props;
    let thisDialog = null;
    if (dialog) {
      thisDialog = (
        <DisplayPopupEl>
          <Dialog
            {...dialogProps}
            onClick={this.handleClick}
            closeCallback={this.handleClick}>
            {dialog}
          </Dialog>
        </DisplayPopupEl>
      );
    }
    return (
      <SemanticUI>
        {thisDialog}
        <AlertsNotifier onDismiss={this.handleDismiss} alerts={alerts} />
      </SemanticUI>
    );
  }
}

const ReshowMessage = props => (
  <Return
    stores={[messageStore]}
    initStates={['alerts', 'dialog', 'dialogProps']}>
    <Body {...props} />
  </Return>
);

export default ReshowMessage;
