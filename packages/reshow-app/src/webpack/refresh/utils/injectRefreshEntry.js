/** @typedef {string | string[] | import('webpack').Entry} StaticEntry */
/** @typedef {StaticEntry | import('webpack').EntryFunc} WebpackEntry */

import { getDirName } from "../../util/getDirName";
const rootDir = getDirName();
import path from "path";

/**
 * Injects an entry to the bundle for react-refresh.
 * @param {WebpackEntry} [originalEntry] A Webpack entry object.
 * @returns {WebpackEntry} An injected entry object.
 */
const injectRefreshEntry = (originalEntry) => {
  const entryInjects = [
    // React-refresh runtime
    path.join(rootDir, "../runtime/ReactRefreshEntry"),
    // Error overlay runtime
    path.join(rootDir, "../runtime/ErrorOverlayEntry"),
  ];

  // Single string entry point
  if (typeof originalEntry === "string") {
    return [...entryInjects, originalEntry];
  }
  // Single array entry point
  if (Array.isArray(originalEntry)) {
    return [...entryInjects, ...originalEntry];
  }
  // Multiple entry points
  if (typeof originalEntry === "object") {
    return Object.entries(originalEntry).reduce(
      (acc, [curKey, curEntry]) => ({
        ...acc,
        [curKey]: injectRefreshEntry(curEntry),
      }),
      {},
    );
  }
  // Dynamic entry points
  if (typeof originalEntry === "function") {
    return (...args) =>
      Promise.resolve(originalEntry(...args)).then((resolvedEntry) =>
        injectRefreshEntry(resolvedEntry),
      );
  }

  throw new Error("Failed to parse the Webpack `entry` object!");
};

export default injectRefreshEntry;
