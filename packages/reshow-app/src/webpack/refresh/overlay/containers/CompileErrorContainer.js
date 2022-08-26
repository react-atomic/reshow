import CompileErrorTrace from "../components/CompileErrorTrace";
import PageHeader from "../components/PageHeader";
import Spacer from "../components/Spacer";

/**
 * @typedef {Object} CompileErrorContainerProps
 * @property {string} errorMessage
 */

/**
 * A container to render Webpack compilation error messages with source trace.
 * @param {Document} document
 * @param {HTMLElement} root
 * @param {CompileErrorContainerProps} props
 * @returns {void}
 */
function CompileErrorContainer(document, root, props) {
  PageHeader(document, root, {
    title: "Failed to compile.",
  });
  CompileErrorTrace(document, root, { errorMessage: props.errorMessage });
  Spacer(document, root, { space: "1rem" });
}

export default CompileErrorContainer;
