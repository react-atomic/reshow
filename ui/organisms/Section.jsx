import React from 'react'; 
import get from 'get-object-value';

import ReshowComponent from '../organisms/ReshowComponent';

class Section extends ReshowComponent
{
    static get initStates()
    {
        return ['section'];
    }

    render()
    {
        const {name, children} = this.props;
        if (!get(this, ['state', 'section', name, 'shouldRender'])) {
            return null;
        }
        const {shouldRender, ...others} = get(this, ['state', 'section', name]);
        if (children) {
            return React.cloneElement(
                children,
                others
            );
        } else {
            return null;
        }
    }
}

Section.displayName = 'FluxConnected(Section)';

export default Section;
