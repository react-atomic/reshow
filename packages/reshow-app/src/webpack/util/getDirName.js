// @ts-check

import { dirname } from "path";

export const getDirName = () => {
  let rootDir = "";
  try {
    // @ts-expect-error
    _NOT_DEFINED;
  } catch (e) {
    const initiator = e.stack.split("\n").slice(2)[0];
    // @ts-ignore
    const file = /(?<path>[^\(\s]+):[0-9]+:[0-9]+/
      ?.exec(initiator)
      ?.groups.path.replace("file://", "");
    rootDir = dirname(file || "");
  }
  return rootDir;
};
