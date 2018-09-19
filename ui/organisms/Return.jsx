import React from 'react';
import ReshowComponent from '../molecules/ReshowComponent';
import getChildren from '../../src/getChildren';

class Return extends ReshowComponent
{
    render()
    {
        const {children, immutable, initStates, pathStates, ...props} = this.props
        return getChildren(
            children,
            {
                ...props,
                ...this.state
            }
        )
    }
}

Return.displayName = 'FluxConnected(Return)';
export default Return;
