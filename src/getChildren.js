import {isValidElement} from 'react'; 

const getChildren = (children, props) =>
{
    let result = null;
    if (children) {
        if (isValidElement(children)) {
            result = cloneElement(
                children,
                props
            );
        } else if (typeof children === 'function') {
            result = children(props);
        }
    }
    return result;
}

export default getChildren;
