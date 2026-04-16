import callfunc from "call-func";
import YoHelper from "./YoHelper";

const defaultI18n = {
  tip: ({ namespace }: { namespace: string }) =>
    `Generate "${namespace}"\n\n !! \n\nYou need create folder\n by yourself.`,
  isReady: ({ destFolderName }: { destFolderName: string }) =>
    `We will put files to [${destFolderName}], do you confirm it?`,
  notReady: "Exit for not ready to create folder.",
  mainName: "Please confirm your naming? Or rename it.",
};

type I18n = Partial<typeof defaultI18n>;

const mainNamePrompt = (oGen: any, i18n?: I18n): any[] => {
  const { say, getDestFolderName, getAllAns, exit } = YoHelper(oGen);
  const mergedI18n = { ...defaultI18n, ...i18n };

  oGen.argument("argMainName", { type: String, required: false });
  const { argMainName, namespace } = oGen.options;
  oGen.options.subGeneratorName = namespace.split(":")[1];

  const prompts: any[] = [];
  if (!argMainName) {
    say(callfunc(mergedI18n.tip, [{ namespace }]));
    prompts.push(
      {
        type: "confirm",
        name: "isReady",
        message: callfunc(mergedI18n.isReady, [
          { destFolderName: getDestFolderName() },
        ]),
        default: false,
      },
      {
        when: (response: any) => {
          const allAns = getAllAns(response);
          if (!allAns.isReady) {
            exit(() => say(callfunc(mergedI18n.notReady)));
          }
        },
      },
    );
  }
  prompts.push({
    type: "input",
    name: "mainName",
    message: callfunc(mergedI18n.mainName),
    default: argMainName || getDestFolderName(),
  });
  return prompts;
};

export default mainNamePrompt;
