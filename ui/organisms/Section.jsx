import React, {cloneElement} from 'react'; 
import get from 'get-object-value';

import ReshowComponent from '../organisms/ReshowComponent';
import getChildren from '../../src/getChildren';

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
        return getChildren(children, others);
    }
}

Section.displayName = 'FluxConnected(Section)';

export default Section;
