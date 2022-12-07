const commonDockerPrompt = (oGen) => {
  return [
    {
      type: "input",
      name: "dockerImageName",
      message: "Please input your docker-image-name?",
      default: "[DOCKER_IMAGE_NAME]",
    },
    {
      type: "input",
      name: "dockerOrgName",
      message: "Please input your docker-org-name?",
      default: "[DOCKER_ORG_NAME]",
    },
    {
      type: "input",
      name: "verPrefix",
      message: "Please input your version-prefix, will use with folder name and version?",
      default: "v",
    },
  ];
};

module.exports = commonDockerPrompt;
