import {getVendorSplitConfig} from './getVendor';
import getTerser from './getTerser';
import {PRODUCTION} from './const';

const getOptimization = ({mode, server, confs}) => {
  const cacheGroups = {
    commons: {
      chunks: 'initial',
      minChunks: 2,
      maxInitialRequests: 5, // The default limit is too small to showcase the effect
      minSize: 0, // This is example is too small to create commons chunks
    },
  };
  if (!confs.disableVendor) {
    cacheGroups.vendor = getVendorSplitConfig({confs});
  }
  const results = {
    occurrenceOrder: true,
  };
  if (!server && 1 !== confs.maxChunks) {
    results.splitChunks = {cacheGroups};
  }
  if (PRODUCTION === mode) {
    results.minimize = true;
    results.minimizer = [getTerser()];
  }
  return results;
};

export default getOptimization;
