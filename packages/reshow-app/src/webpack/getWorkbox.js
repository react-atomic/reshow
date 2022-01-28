import WorkboxPlugin from "workbox-webpack-plugin";
import { stringToArray } from "with-array";
import { PRODUCTION } from "./const";

/**
 * https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW
 *
 * swDest need same folder with location / (Root)
 *
 */
const getWorkbox = ({ swDest, swDebug, additionalManifestEntries }) => {
  const oneMB = 1024000;
  const runtimeCaching = [
    {
      urlPattern: /\.(?:css)$/,
      // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-strategies
      handler: "CacheFirst",
      options: {
        cacheName: "css",
        expiration: {
          maxEntries: 10,
        },
      },
    },
  ];
  const options = {
    swDest,
    runtimeCaching,
    clientsClaim: true,
    skipWaiting: true,
    maximumFileSizeToCacheInBytes: oneMB * 10,
    additionalManifestEntries: stringToArray(additionalManifestEntries),
  };
  if (!swDebug) {
    options.mode = PRODUCTION;
  }
  return new WorkboxPlugin.GenerateSW(options);
};

export default getWorkbox;
