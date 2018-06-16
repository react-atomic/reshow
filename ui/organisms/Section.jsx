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
        const {name, children} = this.props;
        const {section, I18N} = this.state;
        const {shouldRender, ...others} = get(section, [name], {});
        if (!shouldRender) {
            return null
        }
        others.I18N = I18N
        return getChildren(children, others);
    }
}

Section.displayName = 'FluxConnected(Section)';

export default Section;
