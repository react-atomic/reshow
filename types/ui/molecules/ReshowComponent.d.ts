declare const myConnectOptions: {
    shouldComponentUpdate: () => boolean;
    initStates: string[];
    pathStates: {
        I13N: string[];
    };
    storeLocator: (props: any) => any;
    calculateState: typeof connectOptions.calculateState;
    reset: typeof connectOptions.reset;
};
declare const ReshowReturn: {
    (props: any): JSX.Element;
    displayName: string;
};
import { connectOptions } from "reshow-return";
export { myConnectOptions as connectOptions, ReshowReturn as Return };
