import path from "path";

const injectRefreshLoader = (moduleData, injectOptions) => {
  const { match, options } = injectOptions;
  const resolvedLoader = require.resolve("../loader");

  if (
    // Include and exclude user-specified files
    match(moduleData.matchResource || moduleData.resource) &&
    // Exclude files referenced as assets
    !moduleData.type.includes("asset") &&
    // Skip react-refresh and the plugin's runtime utils to prevent self-referencing -
    // this is useful when using the plugin as a direct dependency,
    // or when node_modules are specified to be processed.
    !moduleData.resource.includes(
      path.dirname(require.resolve("react-refresh"))
    ) &&
    !moduleData.resource.includes(path.join(__dirname, "../runtime")) &&
    // Check to prevent double injection
    !moduleData.loaders.find(({ loader }) => loader === resolvedLoader)
  ) {
    // As we inject runtime code for each module,
    // it is important to run the injected loader after everything.
    // This way we can ensure that all code-processing have been done,
    // and we won't risk breaking tools like Flow or ESLint.
    moduleData.loaders.unshift({
      loader: resolvedLoader,
      options,
    });
  }

  return moduleData;
};
export default injectRefreshLoader;
