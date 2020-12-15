import ora from "ora";
import fs from "fs";

const defaultTips = [
  "Trust me, it will finish soon.",
  "If you don't trust me, trust yourself.",
  "If you don't trust yourself, Just wait until you see the finished.",
];

fs.writeFile("webpack.pid", process.pid+"", () => {});

const init = ({ confs }) => {
  const tips = confs.tips?.slice(0) || defaultTips.slice(0);
  let spinner;
  let spinnTimer;
  let secTimer;
  let curTip = tips.shift();
  let curSec = 0;

  if (!spinner) {
    spinner = ora({
      text: curTip,
      spinner: "line",
    }).start();
  }

  if (!spinnTimer) {
    spinnTimer = setInterval(() => {
      if (tips.length) {
        curTip = tips.shift();
        spinner.text = `${curTip} [${curSec}]`;
      }
    }, confs.interval || 5000);
  }

  if (!secTimer) {
    secTimer = setInterval(() => {
      curSec++;
      spinner.text = `${curTip} [${curSec}]`;
    }, 1000);
  }

  return () => {
    if (spinnTimer) {
      clearInterval(spinnTimer);
      spinnTimer = null;
    }
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
