import React from 'react';
import {build} from 'react-atomic-molecule';
import ReshowComponent from '../organisms/ReshowComponentConnected';

class Return extends ReshowComponent {
  render() {
    const {
      children,
      immutable,
      initStates,
      pathStates,
      stores,
      storeLocator,
      globalStoreLocator,
      withConstructor,
      ...otherProps
    } = this.props;
    const {immutable: stateImmutable, ...otherState} = this.state;
    return build(children)({
      ...otherProps,
      ...otherState,
    });
  }
}

Return.displayName = 'FluxConnected(Return)';
export default Return;
