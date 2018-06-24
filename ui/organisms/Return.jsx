import React from 'react';
import ReshowComponent from '../organisms/ReshowComponent';
import getChildren from '../../src/getChildren';

class Return extends ReshowComponent
{
    render()
    {
        const {children, initStates, pathStates, ...props} = this.props
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
