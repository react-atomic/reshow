import reshowRuntimeAlias from "./reshowRuntimeAlias";
import { resolve } from "path";

const getNRoot = (root) => resolve(root, "node_modules");

const getResolve = ({ confs, root }) => {
  const nroot = getNRoot(root);
  const alias = {
    react: `${nroot}/react`,
    "react-dom": `${nroot}/react-dom`,
    reshow: `${nroot}/reshow`,
    "organism-react-ajax": `${nroot}/organism-react-ajax`,
    "organism-react-popup": `${nroot}/organism-react-popup`,
    util: `${nroot}/reshow-app/webpack/util/util`,
    ...reshowRuntimeAlias(root),
    ...confs.alias,
  };

  const fallback = {
    ...confs.fallback,
    stream: require.resolve("readable-stream"),
    util: require.resolve(`${nroot}/reshow-app/webpack/util/util`),
    fs: false,
    net: false,
    tls: false,
    os: false,
  };

  const results = {
    // symlinks for reslove react hook complain.
    symlinks: true,
    extensions: [".mjs", ".js", ".jsx"],
    fallback,
    alias,
  };
  return results;
};

const getResolveLoader = ({ root }) => ({
  modules: [getNRoot(root)],
});

export default getResolve;
export { getResolveLoader };
