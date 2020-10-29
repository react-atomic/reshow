import { getVendorSplitConfig } from "./getVendor";
import getTerser from "./getTerser";
import { PRODUCTION } from "./const";

const getOptimization = ({ mode, server, confs }) => {
  const cacheGroups = { };
  if (!confs.disableVendor) {
    cacheGroups.vendor = getVendorSplitConfig({ confs });
  }
  const results = {
    occurrenceOrder: true,
  };
  if (!server && 1 !== confs.maxChunks) {
    results.splitChunks = { cacheGroups };
  }
  if (PRODUCTION === mode) {
    results.minimize = true;
    results.minimizer = [getTerser()];
  }
  return results;
};

export default getOptimization;
