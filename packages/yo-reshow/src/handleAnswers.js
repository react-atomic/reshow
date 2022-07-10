const handleRepository = (oGen) => {
  const { payload } = oGen;
  if (!payload.repositoryName) {
    payload.repositoryName = payload.mainName;
  }
  const url = `https://github.com/${payload.repositoryOrgName}/${payload.repositoryName}`;
  payload.repository = {
    type: "git",
    url,
  };
  if (payload.babelRootMode) {
    let pkgPath = `packages/${payload.mainName}`;
    if (payload.repositoryName) {
      const destFolder = oGen.destinationRoot();
      const findRepositoryName = destFolder.lastIndexOf(payload.repositoryName);
      if (-1 !== findRepositoryName) {
        pkgPath = destFolder.substring(findRepositoryName+payload.repositoryName.length+1);
      }
    }
    payload.repository.directory = pkgPath;
    payload.repositoryHomepage = url + `/tree/main/${pkgPath}`;
  } else {
    payload.repositoryHomepage = url;
  }
};

const handleAnswers =
  (oGen) =>
  (answers, cb = () => {}) => {
    const { mainName, isUseWebpack } = answers;
    oGen.mainName = mainName;
    oGen.payload = {
      ...answers,
      description: answers.description || "TODO: description",
      keyword: answers.keyword || mainName,
      npmDependencies: {},
      babelRootMode: "",
      webpackEnabled: "",
    };
    if (answers.babelRootMode) {
      oGen.payload.babelRootMode = " --root-mode upward";
    }
    if (isUseWebpack) {
      oGen.payload.webpackEnabled = "on";
      oGen.payload.npmDependencies["reshow-app"] = "*";
    }

    handleRepository(oGen);
    cb(oGen.payload);
  };

module.exports = handleAnswers;
