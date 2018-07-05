import React from 'react'; 
import get from 'get-object-value';

import ReshowComponent from '../organisms/ReshowComponent';
import getChildren from '../../src/getChildren';

class Section extends ReshowComponent
{
   static defaultProps = {
        initStates: ['section', 'I18N'],
   };

    render()
    {
        const {name, children, initStates, ...otherProps} = this.props;
        const {section, I18N} = this.state;
        const {shouldRender, ...others} = get(section, [name], {});
        if (!shouldRender) {
            return null
        }
        const allParams = {...others, ...otherProps, I18N}
        return getChildren(children, allParams)
    }
}

Section.displayName = 'FluxConnected(Section)';

export default Section;
