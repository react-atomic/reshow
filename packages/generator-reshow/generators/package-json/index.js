const { YoGenerator, YoHelper, commonPrompt } = require("yo-reshow");

/**
 * package-json Generator
 */
module.exports = class extends YoGenerator {
  writing() {
    const { cp, getDotYo, handleKeywords, syncJSON } = YoHelper(this);
    const payload = {
      mainName: "",
      description: "",
      babelRootMode: false,
      ...this.payload,
      ...this.options,
      ...getDotYo(this.options),
    };

    syncJSON(
      "package.json",
      null,
      payload,
      (
        data,
        {
          isApp,
          isUseWebpack,
          isUseBabel,
          isUseBabelUI,
          keyword,
          repository,
          repositoryHomepage,
          npmDependencies,
        }
      ) => {
        handleKeywords(keyword, (arr) => (data.keywords = arr));
        data.repository = repository;
        data.homepage = repositoryHomepage;
        if (isApp) {
          data.private = true;
          data.dependencies = {
            pmvc_react_admin: "*",
            react: "^18.x",
            "react-dom": "^18.x",
            "reshow-app": "*",
            ricon: "*",
            ...npmDependencies,
          };
          delete data.devDependencies;
          data.scripts["prepublishOnly"] = "exit 1;";
          data.scripts.build = "npm run clean && npm run build:es";
        } else {
          data.dependencies = {
            ...data.dependencies,
            ...npmDependencies,
          };
        }
        if (!isUseBabel) {
          if (data.devDependencies) {
            delete data.devDependencies["@babel/cli"];
          }
          delete data.exports;
          delete data.module;
          delete data.scripts.clean;
          delete data.scripts["build:cjs"];
          data.main = "./src/index.js";
          data.bin[this.mainName] = "./src/index.js";
          data.scripts.mocha = "npm run mochaFor -- 'src/**/__tests__/*.js'";
          data.files = data.files.filter((f) => f !== "build");
          data.files.push("src");
        }
        if (isUseBabelUI) {
          data.scripts["build:cjs"] = data.scripts["build:ui:cjs"];
          data.scripts["build:es"] = data.scripts["build:ui:es"];
          delete data.bin;
          data.devDependencies["react"] = "^18.x";
          data.devDependencies["react-dom"] = "^18.x";
          data.devDependencies["reshow-unit"] = "*";
          data.devDependencies["react-atomic-atom"] = "*";
          delete data.devDependencies["reshow-unit-dom"];
        }
        if (!isUseWebpack) {
          delete data.scripts["webpack"];
          delete data.scripts["clean:webpack"];
        }
        if (!isApp && !isUseBabel) {
          delete data.scripts["build:es"];
          delete data.scripts.build;
          data.scripts.test = "npm run mocha";
        }
        return data;
      }
    );
  }
};
