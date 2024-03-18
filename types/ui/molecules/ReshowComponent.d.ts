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
declare const ReshowReturn: import("react").ElementType<any, keyof import("react").JSX.IntrinsicElements>;
import { connectOptions } from "reshow-return";
export { myConnectOptions as connectOptions, ReshowReturn as Return };
