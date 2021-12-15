// for app
import YoGenerator from "yeoman-generator";
import YoSay from "yosay";
import mkdirp from "mkdirp";

// for test
import YoTest from "yeoman-test";
import assert from "yeoman-assert";
import path from "path";

const getYo = () => {
  return {
    YoGenerator,
    YoTest: ({ folder, done, params }) => {
      const testHelper = YoTest.run(path.join(folder))
        .inTmpDir((dir) => {
          console.log("Test folder: " + dir);
        })
        .withPrompts(params)
        .on("end", () => {
          done();
        });
      return testHelper;
    },
    YoHelper: (oGen) => {
      const folders = oGen.destinationRoot().split("/");
      const destFolderName = folders[folders.length - 1];
      return {
        destFolderName,
        mkdir: (dir) => {
          mkdirp(oGen.destinationPath(dir));
        },
        say: (message) => {
          oGen.log(YoSay(message), { maxLength: 30 });
        },
        cp: (src, dest, options) => {
          const oGenFs = oGen.fs;
          const action = options ? oGenFs.copyTpl : oGenFs.copy;
          dest = dest || src;
          try {
            action.call(
              oGenFs,
              oGen.templatePath(src),
              oGen.destinationPath(dest),
              options
            );
          } catch (e) {
            console.log(e);
          }
        },
      };
    },
    assert,
  };
};

export default getYo;
