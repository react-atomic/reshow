/**
 * https://webpack.js.org/contribute/writing-a-plugin/
 */

class FinishPlugin {
  constructor(props) {
    this.stop = props.stop;
  }

  apply(compiler) {
    compiler.hooks.done.tap("Hello World Plugin", (
      stats /* stats is passed as argument when done hook is tapped.  */
    ) => {
      this.stop();
    });
  }
}

export default FinishPlugin;
