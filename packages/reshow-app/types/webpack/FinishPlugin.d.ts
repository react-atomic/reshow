export default FinishPlugin;
/**
 * https://webpack.js.org/contribute/writing-a-plugin/
 */
declare class FinishPlugin {
    constructor(props: any);
    stop: any;
    apply(compiler: any): void;
}
