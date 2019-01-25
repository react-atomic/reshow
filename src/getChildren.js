import {isValidElement, cloneElement} from 'react'; 
import {removeEmpty} from 'array.merge';

const getChildren = (children, props) =>
{
    let result = null;
    if (children) {
        if (isValidElement(children)) {
            result = cloneElement(
                children,
                removeEmpty(props, true)
            );
        } else if (typeof children === 'function') {
            result = children(props);
        }
    }
    return result;
}

export default getChildren;
