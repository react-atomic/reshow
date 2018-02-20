import React from 'react'; 
import get from 'get-object-value';

import ReshowComponent from '../organisms/ReshowComponent';
import getChildren from '../../src/getChildren';

class Section extends ReshowComponent
{
   static defaultProps = {
        initStates: ['section'],
   };

    render()
    {
        const {name, children} = this.props;
        const {shouldRender, ...others} = get(this, ['state', 'section', name], {});
        if (!shouldRender) {
            return null;
        }
        return getChildren(children, others);
    }
}

Section.displayName = 'FluxConnected(Section)';

export default Section;
