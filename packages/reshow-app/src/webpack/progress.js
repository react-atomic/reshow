import ora from 'ora';

const defaultTips = [
  'Trust me, it will finish soon.',
  "If you don't trust me, trust yourself.",
  "If you don't trust yourself, Just wait until you see the finished.",
];

const init = ({confs}) => {
  const tips = confs.tips || defaultTips;
  const spinner = ora({
    text: tips.shift(),
    spinner: 'line',
  }).start();
  var spinnTimer = setInterval(()=>{
    spinner.text = tips.shift();
    if (!tips.length) {
      clearInterval(spinnTimer);
    }
  }, 7000);
  return () => {
    clearInterval(spinnTimer);
    spinner.stop();
  };
};

export default init;
