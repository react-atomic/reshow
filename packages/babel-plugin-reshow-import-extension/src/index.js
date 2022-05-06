const { parseSync } = require("@babel/core");
const resolveExt = require("reshow-runtime/helpers/resolveExt");

const getOption = (state, key) => {
  const opts = state.opts || {};
  return opts[key];
};

const resetNodeSource = (path, state) => {
  const extMap = getOption(state, "extMapping");
  if (!extMap) {
    return;
  }
  const source = path.node.source;
  if (source == null) {
    return;
  }
  source.value = resolveExt(source.value, { ...extMap });
};

module.exports = function ({ types: t }) {
  let imported = false;
  let root;
  return {
    visitor: {
      ImportDeclaration: resetNodeSource,
      ExportAllDeclaration: resetNodeSource,
      ExportNamedDeclaration: resetNodeSource,

      // For dynamic import
      CallExpression(path, state) {
        const extMap = getOption(state, "extMapping");
        if (!extMap) {
          return;
        }
        if (!path.get("callee").isImport()) {
          return;
        }

        const arg = path.get("arguments.0");
        const nextPath = resolveExt(arg.node.quasis[0].value.raw, {
          ...extMap,
        });
        arg.replaceWithSourceString(`"${nextPath}"`);
      },
    },
  };
};
