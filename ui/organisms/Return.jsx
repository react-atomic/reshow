import React from 'react';
import ReshowComponent from '../molecules/ReshowComponent';
import getChildren from '../../src/getChildren';

class Return extends ReshowComponent {
  render() {
    const {
      children,
      immutable,
      initStates,
      pathStates,
      stores,
      withConstructor,
      ...otherProps
    } = this.props;
    const {immutable: stateImmutable, ...otherState} = this.state;
    return getChildren(children, {
      ...otherProps,
      ...otherState,
    });
  }
}

Return.displayName = 'FluxConnected(Return)';
export default Return;
