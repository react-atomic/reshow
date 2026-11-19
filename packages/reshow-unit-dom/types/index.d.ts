import { jsdom } from "./setup-dom.js";
declare const hideConsoleError: (toThrow: any) => void;
declare const hideConsoleWarn: (toThrow: any) => void;
declare const getSinon: (options: any) => null;
declare const cleanIt: (props: any) => void;
declare const sleep: (cb: any, delay: any) => Promise<any>;
export { cleanIt, jsdom, hideConsoleError, hideConsoleWarn, getSinon, sleep };
