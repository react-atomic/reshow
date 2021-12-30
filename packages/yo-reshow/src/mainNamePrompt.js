import getYo from "./index";
import YoHelper from "./YoHelper";

const mainNamePrompt = (oGen) => {
  const { say, getDestFolderName, getAllAns, exit } = YoHelper(oGen);
  oGen.argument("argMainName", { type: String, required: false });
  const { argMainName, namespace } = oGen.options;
  const prompts = [];
  if (!argMainName) {
    say(
      `Generate "${namespace}"\n\n !! \n\nYou need create folder\n by yourself.`
    );
    prompts.push(
      {
        type: "confirm",
        name: "isReady",
        message: `We will put files at [${getDestFolderName()}], do you confirm it?`,
        default: false,
      },
      {
        when: (response) => {
          const allAns = { ...response, ...getAllAns() };
          if (!allAns.isReady) {
            exit(()=>say("Exit for not ready to create folder."));
          }
        },
      }
    );
  }
  prompts.push({
    type: "input",
    name: "mainName",
    message: "Please input your app name?",
    default: argMainName || getDestFolderName(),
  });
  return prompts;
};

export default mainNamePrompt;
