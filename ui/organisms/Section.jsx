import React from 'react'; 
import { Reshow } from '../organisms/Reshow';
import get from 'get-object-value';

import {
    pageStore
} from '../../src/index';

const Section = (props) =>
{
    const {name, children, ...others} = props;
    const configs = pageStore.getMap('section');
    if (!get(configs,[name, 'shouldRender'])) {
        return null;
    }
    delete configs[name].shouldRender;
    const conf = get(configs, [name]);
    if (children) {
        return React.cloneElement(
            children,
            conf
        );
    } else {
        return null;
    }
}

export default Section;
