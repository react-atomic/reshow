export default makeRefreshRuntimeModule;
declare function makeRefreshRuntimeModule(webpack: any): {
    new (): {
        [x: string]: any;
        /**
         * @returns {string} runtime code
         */
        generate(): string;
    };
    [x: string]: any;
};
