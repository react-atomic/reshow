import React from 'react'; 
import get from 'get-object-value';

import ReshowComponent from '../molecules/ReshowComponent';
import getChildren from '../../src/getChildren';

class Section extends ReshowComponent
{
   static defaultProps = {
        initStates: ['section', 'I18N'],
        immutable: false,
   };

    render()
    {
        const {immutable: propsImmutable, name, children, initStates, ...otherProps} = this.props;
        const {immutable, section, I18N} = this.state;
        if (!section) {
            return null
        }
        let allParams
        if (immutable) {
            const thisSection = section.get(name)
            if (!thisSection) {
                return null
            }
            const shouldRender = thisSection.get('shouldRender')
            if (!shouldRender) {
                return null
            }
            allParams = {...otherProps, I18N}
            thisSection.delete('shouldRender').keySeq().forEach(key => {
                allParams[key] = thisSection.get(key)
            })
        } else {
            const {shouldRender, ...others} = get(section, [name], {});
            if (!shouldRender) {
                return null
            }
            allParams = {...others, ...otherProps, I18N}
        }
        return getChildren(children, allParams)
    }
}

Section.displayName = 'FluxConnected(Section)';

export default Section;
