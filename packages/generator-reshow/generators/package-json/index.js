const { YoGenerator, YoHelper } = require("yo-reshow");

const getUIBuildTypeScript = (filePattern) =>
  `npx -p typescript tsc src/*.js ${filePattern} --jsx react-jsx --declaration --allowJs --emitDeclarationOnly --skipLibCheck --declarationDir types`;

/**
 * package-json Generator
 */
module.exports = class extends YoGenerator {
  writing() {
    const { cp, getDotYo, handleKeywords, syncJSON } = YoHelper(this);
    const payload = {
      mainName: "",
      description: "",
      babelRootMode: "",
      authorName: "",
      authorEmail: "",
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
            ...npmDependencies,
          };
          delete data.devDependencies;
          delete data.version;
          data.scripts.prepublishOnly = "exit 1;";
          data.scripts.build = "npm run clean && npm run build:es";
          data.scripts["build:type"] = getUIBuildTypeScript("src/ui/**/*.jsx");
        } else {
          delete data.private;
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
          delete data.scripts["build:cjs"];
          data.main = "./src/index.js";
          data.bin[this.mainName] = "./src/index.js";
          data.files = data.files.filter((f) => f !== "build");
          data.files.push("src");
        } else {
          data.devDependencies["react-atomic-atom"] = "*";
        }
        if (isUseBabelUI) {
          delete data.bin;
          data.devDependencies["react"] = "^18.x";
          data.devDependencies["react-dom"] = "^18.x";
          data.devDependencies["reshow-unit"] = "*";
          data.scripts["build:type"] = getUIBuildTypeScript(
            "src/**/*.js src/ui/**/*.jsx"
          );
          delete data.devDependencies["reshow-unit-dom"];
        }
        if (!isUseWebpack) {
          delete data.scripts["webpack"];
          delete data.scripts["clean:webpack"];
        } else {
          cp(".yo");
        }
        if (!isApp && !isUseBabel) {
          delete data.scripts["build:es"];
          delete data.scripts.build;
          delete data.scripts.clean;
          data.scripts.test = "npm run mocha";
          data.scripts.mocha =
            "npm run mochaFor -- 'src/**/__tests__/*.{js,mjs}'";
        }
        return data;
      }
    );
  }
};
