const getModule = () => {
  const module = {
    rules: [
      {
        oneOf: [
          {
            resourceQuery: /raw/,
            type: "asset/source",
          },
          {
            test: /\.m?js$/,
            exclude: [/node_modules/],
            use: { loader: "swc-loader" },
          },
        ],
      },
    ],
  };
  return module;
};

export default getModule;

/**
 * Babel loader version
 * https://github.com/react-atomic/reshow/blob/eb148172b810948e72499310e532308c4f83c339/packages/reshow-app/src/webpack/getModule.js
 */
