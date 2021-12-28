import callfunc from "call-func";

const handleAnswers = (oGen) => (answers, cb) => {
  const { mainName, isUseWebpack } = answers;
  oGen.mainName = mainName;
  oGen.payload = {
    ...answers,
    description: answers.description || "TODO: description",
    keyword: answers.keyword || mainName,
  };
  if (answers.babelRootMode != null) {
    oGen.payload.babelRootMode = answers.babelRootMode
      ? " --root-mode upward"
      : "";
    // isUseWebpack
    oGen.payload.webpackBin = isUseWebpack ? "npm run webpack --" : "";
    oGen.payload.reshowAppPackage = isUseWebpack ? '"reshow-app": "*",' : "";
  }
  callfunc(cb, [oGen.payload]);
};

export default handleAnswers;
