import reshowRuntimeAlias from "./reshowRuntimeAlias";

const getResolve = ({ confs, root, moduleAlias }) => {
  const alias = {
    react: root + "/node_modules/react",
    "react-dom": root + "/node_modules/react-dom",
    reshow: root + "/node_modules/reshow",
    "organism-react-ajax": root + "/node_modules/organism-react-ajax",
    "organism-react-popup": root + "/node_modules/organism-react-popup",
    ...reshowRuntimeAlias(root),
    ...confs.alias,
  };

  const fallback = {
    fs: false,
    net: false,
    tls: false,
    os: false,
  };

  const results = {
    extensions: [".mjs", ".js", ".jsx"],
    fallback
  };
  if (moduleAlias) {
    moduleAlias.addAliases(alias);
  } else {
    results.alias = alias;
  }
  return results;
};

const getResolveLoader = ({ root }) => ({
  modules: [root + "/node_modules"],
});

const getNode = () => ({
  fs: global.fs, 
  net: false,
  tls: false,
});

export default getResolve;
export { getResolveLoader };
