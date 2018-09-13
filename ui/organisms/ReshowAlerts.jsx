import React, {PureComponent} from 'react';
import {AlertsNotifier} from 'organism-react-popup'

import Return from '../organisms/Return'
import messageStore from '../../src/stores/messageStore'
import {dispatch} from '../../src/index'

class ReshowAlerts extends PureComponent
{
  handleDismiss = (item, e) =>
  {
    dispatch('alert/del', {
      id: item.id
    }) 
  }

  render()
  {
    return (
      <Return stores={[messageStore]} initStates={['alerts']}>
        <AlertsNotifier onDismiss={this.handleDismiss}/>
      </Return>
    )
  }
}

export default ReshowAlerts
