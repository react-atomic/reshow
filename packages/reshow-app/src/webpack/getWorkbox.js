import { GenerateSW } from "workbox-webpack-plugin";
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
  // https://developers.google.cn/web/tools/workbox/guides/generate-service-worker/webpack?hl=zh-cn#adding_runtime_caching
  const runtimeCaching = [
    {
      urlPattern: /^(http)(s)?(\:\/\/).*\.(?:css)$/,
      // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-strategies
      handler: "CacheFirst",
      options: {
        cacheName: "css",
        expiration: {
          maxEntries: 10,
        },
      },
    },
    {
      urlPattern: /^(http)(s)?(\:\/\/).*\.(?:env|md|json|adoc)/,
      handler: "CacheFirst",
      options: {
        cacheName: "data",
        expiration: {
          maxEntries: 5,
        },
      },
    },
    {
      urlPattern: /^(http)(s)?(\:\/\/).*\/(?:env)/,
      handler: "CacheFirst",
      options: {
        cacheName: "env",
        expiration: {
          maxEntries: 5,
        },
      },
    },
  ];
  const options = {
    swDest,
    runtimeCaching,
    ignoreURLParametersMatching: [/.*/],
    cleanupOutdatedCaches: false,
    sourcemap: false,
    clientsClaim: true,
    skipWaiting: true,
    maximumFileSizeToCacheInBytes: oneMB * 10,
    additionalManifestEntries: stringToArray(additionalManifestEntries),
  };
  if (!swDebug) {
    options.mode = PRODUCTION;
  }
  return new GenerateSW(options);
};

export default getWorkbox;
