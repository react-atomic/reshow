export interface Payload {
  mainName?: string;
  description: string;
  keyword: string;
  npmDependencies: Record<string, string>;
  babelRootMode: string;
  webpackEnabled: string;
  repositoryName?: string;
  repositoryOrgName?: string;
  repositoryUrl?: string;
  repositoryHomepage?: string;
  repository?: { type: string; url: string; directory?: string };
  isUseWebpack?: boolean;
  [key: string]: unknown;
}

const handleRepository = (oGen: any): void => {
  const { payload }: { payload: Payload } = oGen;
  if (!payload.repositoryName) {
    payload.repositoryName = payload.mainName;
  }
  const url = `git+https://github.com/${
    payload.repositoryOrgName ? payload.repositoryOrgName + "/" : ""
  }${payload.repositoryName}`;
  payload.repository = { type: "git", url };
  payload.repositoryUrl = url;
  if (payload.babelRootMode) {
    let pkgPath = `packages/${payload.mainName}`;
    if (payload.repositoryName) {
      const destFolder = oGen.destinationRoot();
      const findRepositoryName = destFolder.lastIndexOf(payload.repositoryName);
      if (-1 !== findRepositoryName) {
        pkgPath = destFolder.substring(
          findRepositoryName + payload.repositoryName.length + 1,
        );
      }
    }
    payload.repository.directory = pkgPath;
    payload.repositoryHomepage = `${url}/tree/main/${pkgPath}`;
  } else {
    payload.repositoryHomepage = url;
  }
};

const handleAnswers =
  (oGen: any) =>
  (answers: Record<string, any>, cb: (payload: Payload) => void = () => {}): void => {
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

export default handleAnswers;
