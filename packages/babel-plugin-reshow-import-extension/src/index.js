const { parseSync } = require("@babel/core");
const { default: template } = require("@babel/template");
const resolveExt = require("reshow-runtime/helpers/resolveExt");

const buildImport = template(
  `import resolveExt from 'reshow-runtime/helpers/resolveExt';`
);
const resolveExtLib = (filepath, extMapp) => resolveExt(filepath, extMapp);

const astResolveExtension = () => parseSync(`(${resolveExtLib.toString()})`);

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
      Program(path) {
        root = path;
      },

      ImportDeclaration(path, state) {
        resetNodeSource(path, state);
      },

      // For re-exporting
      "ExportNamedDeclaration|ExportAllDeclaration"(path, state) {
        resetNodeSource(path, state);
      },

      // For dynamic import
      CallExpression(path, state) {
        if (!imported) {
          imported = true;
          root.unshiftContainer("body", buildImport());
        }
        const extMap = getOption(state, "extMapping");
        if (!extMap) {
          return;
        }
        if (!path.node.callee || path.node.callee.type !== "Import") {
          return;
        }

        const astExtMapping = t.objectExpression(
          Object.keys(extMap).map((key) =>
            t.objectProperty(t.stringLiteral(key), t.stringLiteral(extMap[key]))
          )
        );

        const argument = path.get("arguments.0");
        argument.replaceWith(
          t.callExpression(astResolveExtension().program.body[0].expression, [argument.node, astExtMapping])
        );
      },
    },
  };
};
