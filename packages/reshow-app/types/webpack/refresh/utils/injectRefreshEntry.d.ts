export default injectRefreshEntry;
export type StaticEntry = string | string[] | import("webpack").Entry;
export type WebpackEntry = StaticEntry | import("webpack").EntryFunc;
/**
 * Injects an entry to the bundle for react-refresh.
 * @param {WebpackEntry} [originalEntry] A Webpack entry object.
 * @returns {WebpackEntry} An injected entry object.
 */
declare function injectRefreshEntry(originalEntry?: WebpackEntry): WebpackEntry;
