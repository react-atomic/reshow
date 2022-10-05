export default Reshow;
declare class Reshow extends PureComponent<any, any, any> {
    static defaultProps: {
        fallback: any;
    };
    static getDerivedStateFromError(error: any): {
        hasError: true;
    };
    constructor(props: any);
    getPath(stateThemePath: any): any;
    /**
     * @see globalStore https://github.com/react-atomic/reshow/blob/main/src/stores/globalStore.js
     */
    resetGlobalPath(path: any): any;
    /**
     * @see globalStore https://github.com/react-atomic/reshow/blob/main/src/stores/globalStore.js
     */
    getGlobalPath(): any;
    state: {
        hasError: boolean;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidCatch(error: any, info: any): void;
    /**
     * @returns {React.ReactElement}
     */
    render(): React.ReactElement;
}
export function update(params: any): void;
import { PureComponent } from "react";
