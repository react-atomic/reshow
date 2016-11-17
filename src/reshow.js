import { Container } from 'reduce-flux';

const reshow = function()
{
    const arr = arguments;
    if (arr.length > 2) {
        return Container.
            createFunctional.
            apply(null,arr);
    } else {
        return Container.
            create.
            apply(null,arr);
    }
};

export default reshow;
