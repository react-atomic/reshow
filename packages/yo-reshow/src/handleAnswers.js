
const handleRepository = (payload) => {
  if (!payload.repositoryName) {
    payload.repositoryName = payload.mainName;
  }
  const url = `https://github.com/${payload.repositoryOrgName}/${payload.repositoryName}`;
  payload.repository = {
    type: "git",
    url,
  };
  if (payload.babelRootMode) {
    payload.repository.directory = `packages/${payload.mainName}`;
    payload.repositoryHomepage =
      url + `/tree/main/packages/${payload.mainName}`;
  } else {
    payload.repositoryHomepage = url;
  }
};

const handleAnswers = (oGen) => (answers, cb = ()=>{}) => {
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

  handleRepository(oGen.payload);
  cb(oGen.payload);
};

module.exports = handleAnswers;
