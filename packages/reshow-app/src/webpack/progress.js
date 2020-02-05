import ora from 'ora';

const defaultTips = [
  'Trust me, it will finish soon.',
  "If you don't trust me, trust yourself.",
  "If you don't trust yourself, Just wait until you see the finished.",
];

let spinner = global.spinner;
global.spinner = spinner;
let spinnTimer = global.spinnTimer;
global.spinnTimer = spinnTimer;

const init = ({confs}) => {
  const tips = confs.tips?.slice(0) || defaultTips.slice(0);

  if (!spinner) {
    spinner = ora({
      text: tips.shift(),
      spinner: 'line',
    }).start();
  }

  if (!spinnTimer) {
    spinnTimer = setInterval(() => {
      if (!tips.length) {
        spinner.text = tips.shift();
      }
    }, 7000);
  }

  return () => {
    if (spinnTimer) {
      clearInterval(spinnTimer);
      spinnTimer = null;
    }
    if (spinner) {
      setTimeout(() => {
        spinner.succeed('Build finished.');
        spinner = null;
      });
    }
  };
};

export default init;
