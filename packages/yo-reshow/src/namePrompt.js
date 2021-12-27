import getYo from "./index";
import YoHelper from "./YoHelper";

const namePrompt = oGen => {
    const { say, getDestFolderName, getAllAns } = YoHelper(oGen);
    oGen.argument("mainName", { type: String, required: false });
    const { mainName } = oGen.options;
    const prompts = [];
    if (!mainName) {
      say(
        'Generate "Reshow App"\n\n !! \n\nYou need create folder\n by yourself.'
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
            const allAns = {...response, ...getAllAns()};
            if (!allAns.isReady) {
              say("Exit for not ready to create folder.");
              process.exit(0);
            }
          },
        },
      );
    }
    prompts.push( 
      {
        type: "input",
        name: "mainName",
        message: "Please input your app name?",
        default: mainName || getDestFolderName(),
      }
    );
    return prompts;
};

export default namePrompt;
