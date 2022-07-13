import ora from "ora";
import fs from "fs";

const defaultTips = [
  "Trust me, it will finish soon.",
  "If you don't trust me, trust yourself.",
  "If you don't trust yourself, Just wait until you see the finished.",
];

fs.writeFile("webpack.pid", process.pid + "", () => {});
let spinner;
let secTimer;

const init = ({ confs }) => {
  const tips = confs.tips?.slice(0) || defaultTips.slice(0);
  let curTip = tips.shift();
  let curSec = 0;

  if (!spinner) {
    setTimeout(() => {
      spinner = ora({
        text: curTip,
        spinner: "line",
      }).start();
    }, 100);
  }

  if (!secTimer) {
    secTimer = setInterval(() => {
      curSec++;
      if (tips.length && curSec % 5 === 0) {
        curTip = tips.shift();
      }
      spinner.text = `${curTip} [${curSec}]`;
    }, 1000);
  }

  return () => {
    if (secTimer) {
      clearInterval(secTimer);
      secTimer = null;
    }
    if (spinner) {
      setTimeout(() => {
        spinner.succeed("Build finished.");
        spinner = null;
      });
    }
  };
};

export default init;
