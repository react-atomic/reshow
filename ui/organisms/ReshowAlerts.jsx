import React, {PureComponent} from 'react';
import {AlertsNotifier} from 'organism-react-popup'

import Return from '../organisms/Return'
import messageStore from '../../src/stores/messageStore'

class ReshowAlerts extends PureComponent
{
  render()
  {
    return (
      <Return stores={[messageStore]} initStates={['alerts']}>
      {({alerts})=>{
        console.log(alerts)
        return <AlertsNotifier alerts={[]}/>
      }}
      </Return>
    )
  }
}

export default ReshowAlerts
