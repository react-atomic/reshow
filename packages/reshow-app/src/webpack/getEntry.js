// @ts-check

import * as fs from "fs";

const isExists = (/**@type string*/ f) => fs.existsSync(f);

/**
 * @typedef {object} GetEntryProps
 * @property {Object<string,string>} main
 * @property {string} root
 * @property {boolean=} server
 */

/**
 * @param {GetEntryProps} props
 */
const getEntry = ({ main, root, server }) => {
  if (!main) {
    const entry = {};
    if (server) {
      const defEntry = `${root}/build/es/src/server`;
      if (isExists(`${defEntry}.mjs`)) {
        entry.node = `${defEntry}.mjs`;
      } else {
        entry.node = `${defEntry}.js`;
      }
    } else {
      const defEntry = `${root}/build/es/src/client`;
      if (isExists(`${defEntry}.mjs`)) {
        entry.main = `${defEntry}.mjs`;
      } else {
        entry.main = `${defEntry}.js`;
      }
    }
    return entry;
  } else {
    return main;
  }
};

export default getEntry;
