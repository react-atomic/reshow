import reshowRuntimeAlias from "./reshowRuntimeAlias";

const getResolve = ({ confs, root, moduleAlias }) => {
  const nroot = root + "/node_modules";
  const alias = {
    react: `${nroot}/react`,
    "react-dom": `${nroot}/react-dom`,
    reshow: `${nroot}/reshow`,
    "organism-react-ajax": `${nroot}/organism-react-ajax`,
    "organism-react-popup": `${nroot}/organism-react-popup`,
    ...reshowRuntimeAlias(root),
    ...confs.alias,
  };

  const fallback = {
    stream: require.resolve("readable-stream"),
    fs: false,
    net: false,
    tls: false,
    os: false,
  };

  const results = {
    // symlinks for reslove react hook complain.
    symlinks: false,
    extensions: [".mjs", ".js", ".jsx"],
    fallback,
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

export default getResolve;
export { getResolveLoader };
