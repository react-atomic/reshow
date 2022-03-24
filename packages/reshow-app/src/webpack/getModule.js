import { PRODUCTION } from "./const";

const getModule = ({ mode, HOT_UPDATE }) => {
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
  const module = {
    rules: [
      {
        test: /(.js|.jsx)$/,
        exclude: [/node_modules/],
        use: [
          "thread-loader",
          "cache-loader",
          {
            loader: "babel-loader",
            options: babelLoaderOption,
          },
        ],
      },
    ],
  };
  return module;
};

export default getModule;
