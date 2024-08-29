export default getRefreshGlobal;
export type RuntimeTemplate = {
    basicFunction: (arg0: string, arg1: string[]) => string;
    supportsConst: () => boolean;
    returningFunction: (arg0: string, arg1: string | undefined) => string;
};
/**
 * @typedef {Object} RuntimeTemplate
 * @property {function(string, string[]): string} basicFunction
 * @property {function(): boolean} supportsConst
 * @property {function(string, string=): string} returningFunction
 */
/**
 * Generates the refresh global runtime template.
 * @param {import('webpack').Template} Template The template helpers.
 * @param {Record<string, string>} [RuntimeGlobals] The runtime globals.
 * @param {RuntimeTemplate} [RuntimeTemplate] The runtime template helpers.
 * @returns {string} The refresh global runtime template.
 */
declare function getRefreshGlobal(Template: import("webpack").Template, RuntimeGlobals?: Record<string, string>, RuntimeTemplate?: RuntimeTemplate): string;
