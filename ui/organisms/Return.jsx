import React from 'react';
import ReshowComponent from '../organisms/ReshowComponent';
import getChildren from '../../src/getChildren';

class Return extends ReshowComponent
{
    render()
    {
       return getChildren(
        this.props.children,
        this.state
       );
    }
}

export default Return;
