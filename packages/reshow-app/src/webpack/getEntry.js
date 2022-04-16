import fs from "fs";

const isExists = (f) => fs.existsSync(f);

const getEntry = ({ main, confs, root, server }) => {
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
