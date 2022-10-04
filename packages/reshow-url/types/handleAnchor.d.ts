export default handleAnchor;
export function goToAnchor(anchor: any): (goAnchorDelay: any) => void;
export function disableHandleAnchor(path: any): () => any;
export function getAnchorPath(path: any): {
    anchor: string;
    path: any;
    anchorArr: string[];
    lastAnchor: string;
};
declare function handleAnchor(rawPath: any): (goAnchorDelay: any) => any;
