import { PRODUCTION } from "./const";

const getModule = ({ mode, HOT_UPDATE }) => {
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
 * Babel usage
const babelLoaderOption = {
  cacheDirectory: true,
  plugins: ["@babel/plugin-syntax-dynamic-import"],
  presets: [["@babel/preset-env", { modules: false }]],
};
if (mode === PRODUCTION) {
  babelLoaderOption.envName = PRODUCTION;
  babelLoaderOption.plugins.push(
    // https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types#options
    ["transform-react-remove-prop-types", { mode: "remove" }]
  );
}
if (HOT_UPDATE) {
  babelLoaderOption.plugins.push("react-refresh/babel");
}
*/
