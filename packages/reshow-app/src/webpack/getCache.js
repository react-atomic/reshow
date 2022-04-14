import { PRODUCTION } from "./const";

const getCache = ({ mode }) => {
  return PRODUCTION === mode
    ? {
        cache: {
          type: "filesystem",
          allowCollectingMemory: true,
        },
      }
    : {};
};

export default getCache;
