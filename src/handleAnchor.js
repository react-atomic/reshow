import getOffset from 'getoffset';
import smoothScrollTo from 'smooth-scroll-to';

let goAnchorTimer;

const handleAnchor = (path, goAnchorDelay) =>
{
    let anchor;
    const anchorStart = path.indexOf('#');
    if (-1 !== anchorStart) {
        anchor = path.substring(anchorStart);
        path = path.substring(0, anchorStart);
    }
    if (anchor) {
        clearTimeout(goAnchorTimer);
        goAnchorTimer = setTimeout(()=>{
            const dom = document.body.querySelector(anchor);
            if (dom) {
                const pos = getOffset(dom); 
                smoothScrollTo(pos.top);
            }
        }, goAnchorDelay);
    }
    return path;
};

export default handleAnchor;
